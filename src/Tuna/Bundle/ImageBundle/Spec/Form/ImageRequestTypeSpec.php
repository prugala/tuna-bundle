<?php

namespace Form\TheCodeine\ImageBundle\Form;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class ImageRequestTypeSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('TheCodeine\ImageBundle\Form\ImageRequestType');
    }
}