use_bcc_instead_A
-----------------

This is a version of
https://addons.thunderbird.net/en-US/thunderbird/addon/use-bcc-instead/
updated with the necessary changes in
https://wiki.mozilla.org/Thunderbird/Add-ons_Guide_57
to work with Thunderbird 60 only (i.e. 60.1, 60.2, ...)

There are later versions:
use_bcc_instead_B works with TB63 (options page does not work, but pre-existing options honoured) 
use_bcc_instead_C works with TB64+
See those repositories' readme files

INSTALLATION
------------

To install or update a previous version:

1 You need TB 60
2 In tools/edit > options/preferences > advanced > config editor:
    Set extensions.strictCompatibility to false (double-click)
3 In https://github.com/revad/use_bcc_instead_A
    Download a ZIP (Green 'Clone or download' button)
4 Extract the downloaded zip file
5 Enter the use_bcc_instead_A-master directory
6 Select all in that directory and create a zip file
7 Open the thunderbird > Addons > Extensions page
8 Drag the zip file onto that page
9 Check version is 3.4.2

This has had minimal testing and that only in Linux.
(I don't know if version 3.4.1 completely worked.)

Raise issues here or email daveroaddonsupp AT gmail.com
