<?php

namespace TheCodeine\CategoryBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use TheCodeine\AdminBundle\Form\DataTransformer\ValueToChoiceOrTextTransformer;

class CategoryType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name');
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'TheCodeine\CategoryBundle\Entity\Category',
        ));
    }

    public function getName()
    {
        return 'tuna_category';
    }
}
