<?php

namespace DependencyInjection\TheCodeine\ImageBundle\DependencyInjection;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class TheCodeineImageExtensionSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('TheCodeine\ImageBundle\DependencyInjection\TheCodeineImageExtension');
    }
}
