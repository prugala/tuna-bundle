<?php

namespace TheCodeine\FileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use TheCodeine\FileBundle\Validator\Constraints as FileAssert;

/**
 * @ORM\EntityListeners({"TheCodeine\FileBundle\EventListener\FileListener"})
 * @ORM\MappedSuperclass
 * @FileAssert\FileExists
 */
abstract class AbstractFile
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $path;

    /**
     * @var string Path of persisted file in database (unmapped property)
     */
    protected $persistedPath;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $filename;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * @return $this
     * @param string $path
     */
    public function setPath($path)
    {
        $this->path = $path;

        return $this;
    }

    /**
     * @return string
     */
    public function getFilename()
    {
        return $this->filename;
    }

    /**
     * @return $this
     * @param string $filename
     */
    public function setFilename($filename)
    {
        $this->filename = $filename;

        return $this;
    }

    /**
     * @return $this
     */
    public function savePersistedPath()
    {
        $this->persistedPath = $this->path;

        return $this;
    }

    public function getPersistedPath()
    {
        return $this->persistedPath;
    }

    public function isUploaded()
    {
        return $this->persistedPath != $this->path;
    }
}
