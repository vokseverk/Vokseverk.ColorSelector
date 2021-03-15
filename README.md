# Color Selector for Umbraco

<img align="right" src="images/vv-colorselector-icon.png" width="180" height="180" alt="Three color swatches (blue, green and orange) inside a square with the Vokseværk ‘fire-heart’ logo" />

A Property Editor for selecting a color - either by picking from a few defaults
or by providing a specific CSS color value.

Currently allows for 5 presets (per datatype).

Includes (from v1.1.0) Property Value Converters for use in Umbraco 7 & 8 -
download them from the release page and put in `App_Code/`
(or add to your Visual Studio solution).

## Screenshots

### Property editor

![Property Screen](images/property-screen.jpg)

### Configuration

![Config Screen](images/config-screen.jpg)


## Building

Running the `build.sh` script (on macOS) builds a ZIP file in the `dist` folder which
should be installable from Umbraco 8's _Packages_ section or
Umbraco 7's _Developer > Packages_ section.
