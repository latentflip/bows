## November 13, 2013 (v0.3)
* Add support for log, debug, error, warn, info as methods on the logger: 

    ```
    logger = bows("MyModule")
    logger("This logs")
    logger.log("This logs")
    logger.warn("This warns")
    logger.error("This errors")
    logger.debug("This debugs")
    logger.info("This infos")
    ```

* Fix bug where the padLength config wasn't doing anything
* Add support for colors in firebug
* Disable color string garbage where colors are not supported
