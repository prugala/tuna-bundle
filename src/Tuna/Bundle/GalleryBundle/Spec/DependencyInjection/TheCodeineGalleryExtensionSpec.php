<?php

namespace DependencyInjection\TheCodeine\GalleryBundle\DependencyInjection;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class TheCodeineGalleryExtensionSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('TheCodeine\GalleryBundle\DependencyInjection\TheCodeineGalleryExtension');
    }
}
