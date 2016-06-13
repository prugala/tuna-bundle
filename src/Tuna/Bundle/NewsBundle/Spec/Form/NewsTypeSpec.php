<?php

namespace Form\TheCodeine\NewsBundle\Form\Type;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class NewsTypeSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('TheCodeine\NewsBundle\Form\NewsType');
    }
}
