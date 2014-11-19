<?php 
namespace Topxia\Service\Courseware\Dao\Impl;

use Topxia\Service\Common\BaseDao;
use Topxia\Service\Courseware\Dao\CoursewareDao;

class CoursewareDaoImpl extends BaseDao implements CoursewareDao
{
    protected $table = 'courseware';

    public function getCourseware($id)
    {

    }

    public function searchCoursewares($conditions, $orderBy, $start, $limit)
    {
        $this->filterStartLimit($start, $limit);
        $builder = $this->_createSearchQueryBuilder($conditions)
            ->select('*')
            ->orderBy($orderBy[0], $orderBy[1])
            ->setFirstResult($start)
            ->setMaxResults($limit);

        return $builder->execute()->fetchAll() ? : array(); 
    }

    public function searchCoursewaresCount($conditions)
    {
        $builder = $this->_createSearchQueryBuilder($conditions)
            ->select('COUNT(id)');
        return $builder->execute()->fetchColumn(0);
    }
    
    public function addCourseware($courseware)
    {

    }

    public function updateCourseware($id,$courseware)
    {

    }

    public function deleteCourseware($id)
    {
        
    }

    private function _createSearchQueryBuilder($conditions)
    {

        if (isset($conditions['title'])) {
            $conditions['titleLike'] = "%{$conditions['title']}%";
            unset($conditions['title']);
        }

        if (isset($conditions['tagIds'])) {
            $tagIds = $conditions['tagIds'];
            $conditions['tagsLike'] = "%";
            if (!empty($tagIds[0])) {
                foreach ($tagIds as $tagId) {
                    $id = "\"".$tagId."\"";
                    $conditions['tagsLike'] .= "{$id},";
                }
            }
            $conditions['tagsLike'] .= "%";
            unset($conditions['tagIds']);
        }

        if (isset($conditions['knowledgeId'])) {
            $knowledgeId = $conditions['knowledgeId'];
            $conditions['knowledgesLike'] = "%";
            if (!empty($knowledgeId)) {
                $conditions['knowledgesLike'] .= "\"".$conditions['knowledgeId']."\"";
            }
            $conditions['knowledgesLike'] .= "%";
            unset($conditions['knowledgeIds']);
        }

        $builder = $this->createDynamicQueryBuilder($conditions)
            ->from($this->table, $this->table)
            ->andWhere('type = :type')
            ->andWhere('title LIKE :titleLike')
            ->andWhere('userId = :userId')
            ->andWhere('categoryId = :categoryId')
            ->andWhere('tagIds LIKE :tagsLike')
            ->andWhere('knowledgeIds LIKE :knowledgesLike')
            ->andWhere('createdTime >= :startTime')
            ->andWhere('createdTime <= :endTime');

        return $builder;
    }
}