<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet
	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
>

	<xsl:output method="text"
		indent="yes"
		omit-xml-declaration="yes"
	/>

	<xsl:variable name="quot">&quot;</xsl:variable>
	<xsl:variable name="objStart">{</xsl:variable>
	<xsl:variable name="objEnd">}</xsl:variable>

	<xsl:template match="/">
		<xsl:text>export default </xsl:text>
		<xsl:value-of select="$objStart" />

		<xsl:apply-templates />

		<xsl:value-of select="$objEnd" />
	</xsl:template>


	<xsl:template match="language">
		<xsl:apply-templates select="area" />
	</xsl:template>

	<xsl:template match="area">
		<xsl:value-of select="concat(@alias, ': ', $objStart)" />

		<xsl:apply-templates select="key" />

		<xsl:value-of select="$objEnd" />
		<xsl:if test="not(position() = last())">, </xsl:if>
	</xsl:template>

	<xsl:template match="key">
		<xsl:value-of select="@alias" />
		<xsl:text>: </xsl:text>
		<xsl:apply-templates select="." mode="quoted" />
		<xsl:if test="not(position() = last())">, </xsl:if>
	</xsl:template>

	<xsl:template match="* | @*" mode="quoted">
		<xsl:value-of select="concat($quot, ., $quot)" />
	</xsl:template>


</xsl:stylesheet>
