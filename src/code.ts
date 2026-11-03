
figma.showUI(__html__, {
  width: 380,
  height: 700,
  themeColors: true
});

// ==========================================
// DESIGNLINT BETA 0.5
// COMPLETE DESIGN SYSTEM AUDITOR
// ==========================================

type AuditIssue = {
  category: string;
  severity: "error" | "warning";
  description: string;
  nodeName: string;
  nodeId: string;
};

const SPACING_SCALE = [
  0, 4, 8, 12, 16, 24, 32, 40, 48, 64
];

const TYPE_SCALE = [
  10, 12, 14, 16, 18, 20, 24, 32, 40, 48
];

// ==========================================
// DESIGN SYSTEM SETTINGS
// ==========================================

// Empty = allow all font families.
const ALLOWED_FONT_FAMILIES: string[] = [];

// Example: [400, 500, 600, 700]
const ALLOWED_FONT_WEIGHTS: number[] = [];

// Require Figma text styles?
const REQUIRE_TEXT_STYLES = false;

// Require spacing variables?
const REQUIRE_SPACING_VARIABLES = false;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function isClose(
  value: number,
  scale: number[],
  tolerance = 0.5
): boolean {
  return scale.some(
    item => Math.abs(item - value) <= tolerance
  );
}

function rgbToHex(color: RGB): string {
  return "#" + [color.r, color.g, color.b]
    .map(value =>
      Math.round(value * 255)
        .toString(16)
        .padStart(2, "0")
    )
    .join("")
    .toUpperCase();
}

function hasVariableBinding(
  node: SceneNode,
  property: string
): boolean {
  if (!("boundVariables" in node)) {
    return false;
  }

  const bindings = (
    node as SceneNode & {
      boundVariables?: Record<string, unknown>;
    }
  ).boundVariables;

  return Boolean(
    bindings && bindings[property]
  );
}

function addIssue(
  issues: AuditIssue[],
  node: SceneNode,
  category: string,
  description: string,
  severity: "error" | "warning" = "warning"
) {
  issues.push({
    category,
    severity,
    description,
    nodeName: node.name,
    nodeId: node.id
  });
}

// ==========================================
// FONT WEIGHT DETECTOR
// ==========================================

function getFontWeight(
  style: string
): number | null {

  const normalized = style
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

  const weights: Record<string, number> = {
    thin: 100,
    hairline: 100,
    extralight: 200,
    ultralight: 200,
    light: 300,
    regular: 400,
    normal: 400,
    medium: 500,
    semibold: 600,
    demibold: 600,
    bold: 700,
    extrabold: 800,
    ultrabold: 800,
    black: 900,
    heavy: 900
  };

  return weights[normalized] ?? null;
}

// ==========================================
// MAIN AUDIT ENGINE
// ==========================================

async function runAudit() {

  const issues: AuditIssue[] = [];

  let scanned = 0;

  const componentStats = {
    components: 0,
    componentSets: 0,
    instances: 0,
    brokenInstances: 0
  };

  const spacingStats = {
    gapChecks: 0,
    paddingChecks: 0
  };

  const typographyStats = {
    textNodes: 0,
    fontSizeChecks: 0,
    fontFamilyChecks: 0,
    fontWeightChecks: 0,
    lineHeightChecks: 0,
    letterSpacingChecks: 0,
    textStyleChecks: 0
  };

  // ========================================
  // LOAD COLOR VARIABLES
  // ========================================

  const variables =
    await figma.variables.getLocalVariablesAsync("COLOR");

  const knownColors = new Set<string>();

  for (const variable of variables) {

    for (const value of Object.values(
      variable.valuesByMode
    )) {

      if (
        typeof value === "object" &&
        value !== null &&
        "r" in value &&
        "g" in value &&
        "b" in value
      ) {
        knownColors.add(
          rgbToHex(value as RGB)
        );
      }
    }
  }

  // ========================================
  // COLOR AUDIT
  // ========================================

  function inspectPaint(
    paint: Paint,
    node: SceneNode
  ) {

    if (
      paint.type !== "SOLID" ||
      paint.visible === false
    ) {
      return;
    }

    const hex = rgbToHex(paint.color);

    if (paint.boundVariables?.color) {
      return;
    }

    if (knownColors.has(hex)) {

      addIssue(
        issues,
        node,
        "Variable binding",
        `${hex} matches a local variable but is not connected to it.`
      );

      return;
    }

    addIssue(
      issues,
      node,
      "Hardcoded color",
      `${hex} has no matching local color variable binding.`
    );
  }

  // ========================================
  // SPACING AUDIT
  // ========================================

  function inspectSpacing(
    node: SceneNode,
    property: string,
    value: number,
    label: string
  ) {

    if (value <= 0) return;

    const isBound = hasVariableBinding(
      node,
      property
    );

    if (!isClose(value, SPACING_SCALE)) {

      addIssue(
        issues,
        node,
        "Spacing audit",
        `${label} is ${value}px. This value is outside your spacing scale.`
      );

      return;
    }

    if (
      REQUIRE_SPACING_VARIABLES &&
      !isBound
    ) {

      addIssue(
        issues,
        node,
        "Spacing variable",
        `${label} (${value}px) is hardcoded instead of using a spacing variable.`
      );
    }
  }

  // ========================================
  // TYPOGRAPHY AUDIT
  // ========================================

  function inspectTypography(node: TextNode) {

    typographyStats.textNodes++;

    // FONT SIZE
    if (typeof node.fontSize === "number") {

      typographyStats.fontSizeChecks++;

      if (!isClose(node.fontSize, TYPE_SCALE)) {

        addIssue(
          issues,
          node,
          "Typography / Font size",
          `Font size ${node.fontSize}px is outside your typography scale.`
        );
      }
    }

    // FONT FAMILY AND WEIGHT
    if (
      node.fontName !== figma.mixed &&
      typeof node.fontName !== "symbol"
    ) {

      const font = node.fontName;

      const family = font.family;
      const style = font.style;

      typographyStats.fontFamilyChecks++;

      // FONT FAMILY
      if (
        ALLOWED_FONT_FAMILIES.length > 0 &&
        !ALLOWED_FONT_FAMILIES.includes(family)
      ) {

        addIssue(
          issues,
          node,
          "Typography / Font family",
          `Font family "${family}" is not in your approved font list.`
        );
      }

      // FONT WEIGHT
      typographyStats.fontWeightChecks++;

      const weight = getFontWeight(style);

      if (
        weight !== null &&
        ALLOWED_FONT_WEIGHTS.length > 0 &&
        !ALLOWED_FONT_WEIGHTS.includes(weight)
      ) {

        addIssue(
          issues,
          node,
          "Typography / Font weight",
          `Font weight ${weight} (${style}) is not in your approved weight list.`
        );
      }
    }

    // LINE HEIGHT
    const lineHeight = node.lineHeight;

    if (
      lineHeight !== figma.mixed &&
      typeof lineHeight === "object" &&
      lineHeight !== null
    ) {

      typographyStats.lineHeightChecks++;

      if (
        lineHeight.unit === "PIXELS" &&
        typeof lineHeight.value === "number" &&
        typeof node.fontSize === "number" &&
        node.fontSize > 0
      ) {

        const ratio =
          lineHeight.value / node.fontSize;

        if (ratio < 1 || ratio > 2) {

          addIssue(
            issues,
            node,
            "Typography / Line height",
            `Line height ratio ${ratio.toFixed(2)} is outside the recommended 1.0–2.0 range.`
          );
        }
      }

      if (
        lineHeight.unit === "PERCENT" &&
        typeof lineHeight.value === "number" &&
        (
          lineHeight.value < 100 ||
          lineHeight.value > 200
        )
      ) {

        addIssue(
          issues,
          node,
          "Typography / Line height",
          `Line height ${lineHeight.value}% is outside the configured 100%–200% range.`
        );
      }
    }

    // LETTER SPACING
    const letterSpacing = node.letterSpacing;

    if (
      letterSpacing !== figma.mixed &&
      typeof letterSpacing === "object" &&
      letterSpacing !== null
    ) {

      typographyStats.letterSpacingChecks++;

      if (
        letterSpacing.unit === "PIXELS" &&
        typeof letterSpacing.value === "number" &&
        Math.abs(letterSpacing.value) > 2
      ) {

        addIssue(
          issues,
          node,
          "Typography / Letter spacing",
          `Letter spacing ${letterSpacing.value}px exceeds the configured ±2px threshold.`
        );
      }

      if (
        letterSpacing.unit === "PERCENT" &&
        typeof letterSpacing.value === "number" &&
        Math.abs(letterSpacing.value) > 10
      ) {

        addIssue(
          issues,
          node,
          "Typography / Letter spacing",
          `Letter spacing ${letterSpacing.value}% exceeds the configured ±10% threshold.`
        );
      }
    }

    // TEXT STYLE
    typographyStats.textStyleChecks++;

    if (
      REQUIRE_TEXT_STYLES &&
      (!node.textStyleId || node.textStyleId === "0")
    ) {

      addIssue(
        issues,
        node,
        "Typography / Missing text style",
        "This text layer does not have a Figma text style applied."
      );
    }
  }

  // ========================================
  // RECURSIVE NODE INSPECTION
  // ========================================

  async function inspect(node: SceneNode) {

    scanned++;

    // COMPONENT INVENTORY
    if (node.type === "COMPONENT") {
      componentStats.components++;
    }

    if (node.type === "COMPONENT_SET") {
      componentStats.componentSets++;
    }

    // COMPONENT INSTANCE
    if (node.type === "INSTANCE") {

      componentStats.instances++;

      try {

        const mainComponent =
          await node.getMainComponentAsync();

        if (!mainComponent) {

          componentStats.brokenInstances++;

          addIssue(
            issues,
            node,
            "Broken component",
            "The main component is unavailable. Check the source component or library."
          );
        }

      } catch (error) {

        componentStats.brokenInstances++;

        addIssue(
          issues,
          node,
          "Component reference error",
          "Could not resolve the main component reference."
        );
      }
    }

    // COLOR FILLS
    if (
      "fills" in node &&
      Array.isArray(node.fills)
    ) {

      for (const paint of node.fills) {
        inspectPaint(paint, node);
      }
    }

    // COLOR STROKES
    if (
      "strokes" in node &&
      Array.isArray(node.strokes)
    ) {

      for (const paint of node.strokes) {
        inspectPaint(paint, node);
      }
    }

    // AUTO LAYOUT AUDIT
    if (
      "layoutMode" in node &&
      node.layoutMode !== "NONE"
    ) {

      // GAP
      if (
        "itemSpacing" in node &&
        typeof node.itemSpacing === "number"
      ) {

        spacingStats.gapChecks++;

        inspectSpacing(
          node,
          "itemSpacing",
          node.itemSpacing,
          "Auto Layout gap"
        );
      }

      // TOP PADDING
      if (
        "paddingTop" in node &&
        typeof node.paddingTop === "number"
      ) {

        spacingStats.paddingChecks++;

        inspectSpacing(
          node,
          "paddingTop",
          node.paddingTop,
          "Top padding"
        );
      }

      // BOTTOM PADDING
      if (
        "paddingBottom" in node &&
        typeof node.paddingBottom === "number"
      ) {

        spacingStats.paddingChecks++;

        inspectSpacing(
          node,
          "paddingBottom",
          node.paddingBottom,
          "Bottom padding"
        );
      }

      // LEFT PADDING
      if (
        "paddingLeft" in node &&
        typeof node.paddingLeft === "number"
      ) {

        spacingStats.paddingChecks++;

        inspectSpacing(
          node,
          "paddingLeft",
          node.paddingLeft,
          "Left padding"
        );
      }

      // RIGHT PADDING
      if (
        "paddingRight" in node &&
        typeof node.paddingRight === "number"
      ) {

        spacingStats.paddingChecks++;

        inspectSpacing(
          node,
          "paddingRight",
          node.paddingRight,
          "Right padding"
        );
      }
    }

    // TYPOGRAPHY AUDIT
    if (node.type === "TEXT") {
      inspectTypography(node);
    }

    // RECURSIVE CHILDREN
    if ("children" in node) {

      for (const child of node.children) {
        await inspect(child);
      }
    }
  }

  // ========================================
  // SCAN CURRENT PAGE
  // ========================================

  for (const child of figma.currentPage.children) {
    await inspect(child);
  }

  return {
    issues,
    scanned,
    componentStats,
    spacingStats,
    typographyStats
  };
}

// ==========================================
// FIGMA MESSAGE HANDLER
// ==========================================

figma.ui.onmessage = async (message) => {

  if (message.type === "RUN_AUDIT") {

    try {

      const result = await runAudit();

      figma.ui.postMessage({
        type: "AUDIT_RESULTS",
        ...result
      });

    } catch (error) {

      console.error(
        "DesignLint audit error:",
        error
      );

      figma.notify(
        "Audit failed. Check the plugin console."
      );

      figma.ui.postMessage({
        type: "AUDIT_ERROR"
      });
    }
  }

  // CLICK TO LOCATE
  if (message.type === "SELECT_NODE") {

    const node = await figma.getNodeByIdAsync(
      message.nodeId
    );

    if (
      node &&
      node.type !== "DOCUMENT" &&
      node.type !== "PAGE"
    ) {

      figma.currentPage.selection = [
        node as SceneNode
      ];

      figma.viewport.scrollAndZoomIntoView([
        node as SceneNode
      ]);
    }
  }
};
