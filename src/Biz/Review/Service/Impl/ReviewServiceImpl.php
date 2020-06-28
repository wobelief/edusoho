<?php

namespace Biz\Review\Service\Impl;

use AppBundle\Common\ArrayToolkit;
use Biz\BaseService;
use Biz\Common\CommonException;
use Biz\Course\CourseException;
use Biz\Course\Service\CourseService;
use Biz\Course\Service\MemberService;
use Biz\Goods\GoodsException;
use Biz\Goods\Service\GoodsService;
use Biz\Goods\Service\PurchaseService;
use Biz\Review\Dao\ReviewDao;
use Biz\Review\ReviewException;
use Biz\Review\Service\ReviewService;
use Biz\Sensitive\Service\SensitiveService;
use Codeages\Biz\Framework\Event\Event;

class ReviewServiceImpl extends BaseService implements ReviewService
{
    protected $reviewMap = [
        'goods' => 'tryCreateGoodsReview',
        'course' => 'tryCreateCourseReview',
    ];

    public function getReview($id)
    {
        return $this->getReviewDao()->get($id);
    }

    public function tryCreateReview($review)
    {
        if (!in_array($review['targetType'], array_keys($this->reviewMap))) {
            $this->createNewException(CommonException::ERROR_PARAMETER());
        }

        $function = $this->reviewMap[$review['targetType']];

        return $this->$function($review);
    }

    public function createReview($review)
    {
        if (!ArrayToolkit::requireds($review, ['userId', 'rating', 'targetType', 'targetId', 'content'])) {
            $this->createNewException(CommonException::ERROR_PARAMETER_MISSING());
        }

        if ($review['rating'] > 5) {
            $this->createNewException(ReviewException::RATING_LIMIT());
        }

        $review = $this->tryCreateReview($review);

        $review = ArrayToolkit::parts($review, [
            'userId', 'targetType', 'targetId', 'content', 'rating', 'parentId',
        ]);

        $review['content'] = $this->purifyHtml($review['content']);
        $review['content'] = $this->getSensitiveService()->sensitiveCheck($review['content'], 'review');

        $review = $this->getReviewDao()->create($review);
        $this->dispatchEvent('review.create', new Event($review));

        return $review;
    }

    public function getByUserIdAndTargetTypeAndTargetId($userId, $targetType, $targetId)
    {
        return $this->getReviewDao()->getByUserIdAndTargetTypeAndTargetId($userId, $targetType, $targetId);
    }

    public function updateReview($id, $review)
    {
        $review = ArrayToolkit::parts($review, ['content', 'rating']);

        $existed = $this->getReviewDao()->get($id);

        $this->tryOperateReview($existed);

        $review = $this->getReviewDao()->update($id, $review);

        $this->dispatchEvent('review.update', new Event($review));

        return $review;
    }

    public function deleteReview($id)
    {
        $review = $this->getReviewDao()->get($id);

        if (empty($review)) {
            return true;
        }

        $this->tryOperateReview($review);

        $this->getReviewDao()->delete($id);

        $this->dispatchEvent('review.delete', new Event($review));

        return true;
    }

    public function countReview($conditions)
    {
        return $this->getReviewDao()->count($conditions);
    }

    public function searchReview($conditions, $orderBys, $start, $limit, $columns = [])
    {
        return $this->getReviewDao()->search($conditions, $orderBys, $start, $limit, $columns);
    }

    public function countRatingByTargetTypeAndTargetId($targetType, $targetId)
    {
        $conditions = [
            'targetType' => $targetType,
            'targetId' => $targetId,
            'parentId' => 0,
        ];
        $ratingNum = $this->countReview($conditions);
        $rating = $this->getReviewDao()->sumRatingByConditions($conditions);

        return [
            'ratingNum' => $ratingNum,
            'rating' => $ratingNum ? $rating / $ratingNum : 0,
        ];
    }

    protected function tryOperateReview($review)
    {
        if ($review['userId'] != $this->getCurrentUser()->getId() && !$this->getCurrentUser()->isAdmin()) {
            $this->createNewException(ReviewException::FORBIDDEN_OPERATE_REVIEW());
        }
    }

    protected function tryCreateGoodsReview($review)
    {
        $goods = $this->getGoodsService()->getGoods($review['targetId']);
        if (empty($goods)) {
            $this->createNewException(GoodsException::GOODS_NOT_FOUND());
        }

        $purchaseCount = $this->getGoodsPurchaseService()->countVouchers([
            'userId' => $review['userId'],
            'goodsId' => $goods['id'],
        ]);

        if (!$purchaseCount) {
            $this->createNewException(ReviewException::FORBIDDEN_CREATE_REVIEW());
        }

        return $review;
    }

    protected function tryCreateCourseReview($review)
    {
        $course = $this->getCourseService()->getCourse($review['targetId']);

        if (empty($course)) {
            $this->createNewException(CourseException::NOTFOUND_COURSE());
        }

        $member = $this->getCourseMemberService()->getCourseMember($course['id'], $review['userId']);

        if (!$member) {
            $this->createNewException(ReviewException::FORBIDDEN_CREATE_REVIEW());
        }

        return $review;
    }

    /**
     * @return ReviewDao
     */
    protected function getReviewDao()
    {
        return $this->createDao('Review:ReviewDao');
    }

    /**
     * @return SensitiveService
     */
    protected function getSensitiveService()
    {
        return $this->createService('Sensitive:SensitiveService');
    }

    /**
     * @return GoodsService
     */
    protected function getGoodsService()
    {
        return $this->createService('Goods:GoodsService');
    }

    /**
     * @return PurchaseService
     */
    protected function getGoodsPurchaseService()
    {
        return $this->createService('Goods:PurchaseService');
    }

    /**
     * @return CourseService
     */
    protected function getCourseService()
    {
        return $this->createService('Course:CourseService');
    }

    /**
     * @return MemberService
     */
    protected function getCourseMemberService()
    {
        return $this->createService('Course:MemberService');
    }
}
