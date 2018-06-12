=== Privacy & Consent Assistant ===
Contributors: Third River Marketing, Alex Demchak
Tags: Third River Marketing
Requires at least: 3.5.1
Tested up to: 4.9.5
Stable tag: 1.0.7.3
License URI: http://www.gnu.org/licenses/gpl-3.0.html

An easy-to-use interface to aide with Consent and Privacy compliance.

== Description ==

This plugin provides an interface to assist with consent and privacy compliance. It is not guaranteed to satisfy all clauses in the GDPR or any other legal requirements. The policies included in this plugin should be reviewed by your legal team before use.

== Installation ==

1. Upload the unzipped plugin file to the `/wp-content/plugins/` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. It's recommended to insert the Company information in the Privacy & Consent admin panel.

== Changelog ==
= 1.0.7.3 =
* Fixed a syntax Error when setting cookies

= 1.0.7.2 =
* Default Consent Cookie to expire in 1 year

= 1.0.7 =
* Prevented Genesis Specific errors

= 1.0.6 =
* Replaced Dynamic CSS file with Dynamic CSS option.
* Forced Positioning and colors on Consent Messages to better accommodate all themes.

= 1.0.5 =
* Better sanitization/validation methods when saving options
* Fixed minor JS errors on non-post editor pages. 

= 1.0.4 =
* Increased security with hiding Dynamic Delete form consents.
* Modified JS errors thrown when illegally submitting Dynamic Delete requests.
* Increased security and sanitization with Admin Options.
* Prevented "Direct File Access" to PHP files.

= 1.0.3 =
* Attempt to hide existing policy links with CSS
* Add option to disable "hide existing links" feature
* Make Feature Options easier to add in the future.
* Changed Name to Privacy & Consent Assistant

= 1.0.2 =
* Options weren't setting and Policies not being created on Network Activation. Accounted for that now.

= 1.0.1 =
* Initial Release