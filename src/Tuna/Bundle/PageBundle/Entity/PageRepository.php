<?php

namespace TheCodeine\PageBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;
use Doctrine\ORM\QueryBuilder;
use Gedmo\Translatable\TranslatableListener;

/**
 * PageRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class PageRepository extends EntityRepository
{
    public function findAllPublished()
    {
        return $this->findBy(array('published' => true));
    }
    
    public function getListQuery($published = null)
    {
        $query = $this->createQueryBuilder('p');

        if ($published !== null) {
            $query->andWhere('p.published = 1');
        }

        return $query->getQuery();
    }

    public function getSingleItem($slug)
    {
        $qb = $this->createQueryBuilder('n')
            ->andWhere('n.slug = :slug')
            ->setParameter('slug', $slug)
            ->setMaxResults(1);

        return $this->addTranslationWalker($qb)->getResult();
    }

    protected function addTranslationWalker(QueryBuilder $qb)
    {
        return $qb
            ->getQuery()
            ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, 'Gedmo\\Translatable\\Query\\TreeWalker\\TranslationWalker')
            ->setHint(TranslatableListener::HINT_INNER_JOIN, true);
    }
}
