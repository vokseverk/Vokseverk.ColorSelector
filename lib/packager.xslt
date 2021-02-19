<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE xsl:stylesheet [
	<!ENTITY % packageInfo SYSTEM "../src/package.ent">
	%packageInfo;
]>
<!--
	This transforms a template package.xml file into the one used in the package.
	Primarily using this to make it easier to "version" the files, thus making it
	a zillion times easier to make sure Umbraco is using the latest build when
	trying to debug the package/property editor.
-->
<xsl:stylesheet
	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
>

	<xsl:output method="xml"
		indent="yes"
		omit-xml-declaration="no"
		cdata-section-elements="Design readme"
	/>

	<xsl:variable name="packageName" select="'&packageName;'" />
	<xsl:variable name="folderPrefix" select="/umbPackage/files/@folderPrefix" />
	<xsl:variable name="version" select="'v&packageVersion;'" />

	<!-- Identity transform -->
	<xsl:template match="/">
		<xsl:apply-templates select="* | text() | processing-instruction()" />
	</xsl:template>
		
	<xsl:template match="* | text()">
		<xsl:copy>
			<xsl:copy-of select="@*" />
			<xsl:apply-templates select="* | text() | processing-instruction()" />
		</xsl:copy>
	</xsl:template>
	
	<xsl:template match="comment() | processing-instruction()">
		<xsl:copy-of select="." />
	</xsl:template>
	
	<!-- The `<files>` element has a `@folderPrefix` attribute we don't want to copy -->
	<xsl:template match="files">
		<files>
			<xsl:apply-templates />
		</files>
	</xsl:template>

	<xsl:template match="file[@ref]">
		<file>
			<guid><xsl:value-of select="@ref" /></guid>
			<orgPath>
				<xsl:apply-templates select="@ref" mode="versioned" />
			</orgPath>
			<orgName><xsl:value-of select="@ref" /></orgName>
		</file>
	</xsl:template>
	
	<xsl:template match="@*" mode="versioned">
		<xsl:value-of select="concat('/App_Plugins/', $packageName, '/')" />
		<xsl:if test="not(../@versioned = 'no')"><xsl:value-of select="$version" /></xsl:if>
	</xsl:template>

</xsl:stylesheet>
