"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };

  // src/code.ts
  figma.showUI('\r\n<!DOCTYPE html>\r\n<html>\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n\r\n  <style>\r\n    * {\r\n      box-sizing: border-box;\r\n    }\r\n\r\n    body {\r\n      margin: 0;\r\n      padding: 20px;\r\n      background: #101114;\r\n      color: #f5f5f5;\r\n      font-family: Inter, Arial, sans-serif;\r\n    }\r\n\r\n    .header {\r\n      display: flex;\r\n      justify-content: space-between;\r\n      align-items: center;\r\n      margin-bottom: 20px;\r\n    }\r\n\r\n    .logo {\r\n      font-size: 20px;\r\n      font-weight: 750;\r\n      letter-spacing: -0.8px;\r\n    }\r\n\r\n    .version {\r\n      font-size: 10px;\r\n      color: #c4b5fd;\r\n      background: #292333;\r\n      padding: 5px 9px;\r\n      border-radius: 20px;\r\n    }\r\n\r\n    .subtitle {\r\n      color: #a1a1aa;\r\n      font-size: 12px;\r\n      margin-bottom: 20px;\r\n    }\r\n\r\n    .button {\r\n      width: 100%;\r\n      padding: 13px;\r\n      background: #a78bfa;\r\n      color: #171322;\r\n      border: none;\r\n      border-radius: 8px;\r\n      font-weight: 700;\r\n      cursor: pointer;\r\n      margin-bottom: 18px;\r\n      font-size: 13px;\r\n    }\r\n\r\n    .button:hover {\r\n      background: #b69dfc;\r\n    }\r\n\r\n    .button:disabled {\r\n      opacity: 0.5;\r\n      cursor: wait;\r\n    }\r\n\r\n    .stats,\r\n    .component-grid,\r\n    .spacing-grid,\r\n    .typography-grid {\r\n      display: grid;\r\n      grid-template-columns: 1fr 1fr;\r\n      gap: 9px;\r\n    }\r\n\r\n    .stat,\r\n    .card,\r\n    .issue {\r\n      background: #1c1d22;\r\n      border: 1px solid #303139;\r\n      border-radius: 10px;\r\n      padding: 13px;\r\n    }\r\n\r\n    .stat small,\r\n    .card small {\r\n      color: #a1a1aa;\r\n      font-size: 11px;\r\n    }\r\n\r\n    .number {\r\n      font-size: 25px;\r\n      font-weight: 700;\r\n      margin-top: 8px;\r\n    }\r\n\r\n    .card-value {\r\n      font-size: 20px;\r\n      font-weight: 700;\r\n      margin-top: 6px;\r\n    }\r\n\r\n    .section-title {\r\n      font-size: 13px;\r\n      margin: 23px 0 12px;\r\n      font-weight: 700;\r\n    }\r\n\r\n    #results {\r\n      display: grid;\r\n      gap: 9px;\r\n    }\r\n\r\n    .issue {\r\n      font-size: 12px;\r\n      line-height: 1.6;\r\n      cursor: pointer;\r\n      transition: border-color 0.2s;\r\n    }\r\n\r\n    .issue:hover {\r\n      border-color: #a78bfa;\r\n    }\r\n\r\n    .issue strong {\r\n      display: block;\r\n      margin-bottom: 4px;\r\n    }\r\n\r\n    .error {\r\n      color: #fb7185;\r\n    }\r\n\r\n    .warning {\r\n      color: #fbbf24;\r\n    }\r\n\r\n    .success {\r\n      color: #4ade80;\r\n    }\r\n\r\n    .issue small {\r\n      display: block;\r\n      color: #a1a1aa;\r\n      margin-top: 5px;\r\n    }\r\n\r\n    .empty {\r\n      color: #a1a1aa;\r\n      font-size: 12px;\r\n      padding: 18px;\r\n      text-align: center;\r\n      border: 1px dashed #41414a;\r\n      border-radius: 10px;\r\n    }\r\n\r\n    #status {\r\n      color: #a1a1aa;\r\n      font-size: 11px;\r\n      line-height: 1.6;\r\n      margin-top: 12px;\r\n      overflow-wrap: anywhere;\r\n    }\r\n\r\n    .footer {\r\n      color: #666875;\r\n      font-size: 10px;\r\n      text-align: center;\r\n      margin-top: 24px;\r\n    }\r\n\r\n  </style>\r\n</head>\r\n\r\n<body>\r\n\r\n  <!-- HEADER -->\r\n  <div class="header">\r\n    <div class="logo">\u2733 DesignLint</div>\r\n    <div class="version">BETA 0.5</div>\r\n  </div>\r\n\r\n  <div class="subtitle">\r\n    Design System Quality Auditor\r\n  </div>\r\n\r\n  <!-- RUN AUDIT -->\r\n  <button class="button" id="audit">\r\n    Run Design Audit \u2192\r\n  </button>\r\n\r\n  <!-- MAIN STATISTICS -->\r\n  <div class="stats">\r\n\r\n    <div class="stat">\r\n      <small>Total Issues</small>\r\n      <div class="number" id="total">0</div>\r\n    </div>\r\n\r\n    <div class="stat">\r\n      <small>Scanned Nodes</small>\r\n      <div class="number" id="scanned">0</div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <!-- COMPONENT OVERVIEW -->\r\n  <div class="section-title">\r\n    Component Overview\r\n  </div>\r\n\r\n  <div class="component-grid">\r\n\r\n    <div class="card">\r\n      <small>Components</small>\r\n      <div class="card-value" id="components">0</div>\r\n    </div>\r\n\r\n    <div class="card">\r\n      <small>Component Sets</small>\r\n      <div class="card-value" id="componentSets">0</div>\r\n    </div>\r\n\r\n    <div class="card">\r\n      <small>Instances</small>\r\n      <div class="card-value" id="instances">0</div>\r\n    </div>\r\n\r\n    <div class="card">\r\n      <small>Broken Instances</small>\r\n      <div class="card-value" id="broken">0</div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <!-- SPACING OVERVIEW -->\r\n  <div class="section-title">\r\n    Spacing Overview\r\n  </div>\r\n\r\n  <div class="spacing-grid">\r\n\r\n    <div class="card">\r\n      <small>Gap Checks</small>\r\n      <div class="card-value" id="gapChecks">0</div>\r\n    </div>\r\n\r\n    <div class="card">\r\n      <small>Padding Checks</small>\r\n      <div class="card-value" id="paddingChecks">0</div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <!-- TYPOGRAPHY OVERVIEW -->\r\n  <div class="section-title">\r\n    Typography Overview\r\n  </div>\r\n\r\n  <div class="typography-grid">\r\n\r\n    <div class="card">\r\n      <small>Text Layers</small>\r\n      <div class="card-value" id="textNodes">0</div>\r\n    </div>\r\n\r\n    <div class="card">\r\n      <small>Font Size Checks</small>\r\n      <div class="card-value" id="fontSizeChecks">0</div>\r\n    </div>\r\n\r\n    <div class="card">\r\n      <small>Font Family Checks</small>\r\n      <div class="card-value" id="fontFamilyChecks">0</div>\r\n    </div>\r\n\r\n    <div class="card">\r\n      <small>Font Weight Checks</small>\r\n      <div class="card-value" id="fontWeightChecks">0</div>\r\n    </div>\r\n\r\n    <div class="card">\r\n      <small>Line Height Checks</small>\r\n      <div class="card-value" id="lineHeightChecks">0</div>\r\n    </div>\r\n\r\n    <div class="card">\r\n      <small>Letter Spacing Checks</small>\r\n      <div class="card-value" id="letterSpacingChecks">0</div>\r\n    </div>\r\n\r\n    <div class="card">\r\n      <small>Text Style Checks</small>\r\n      <div class="card-value" id="textStyleChecks">0</div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <!-- AUDIT FINDINGS -->\r\n  <div class="section-title">\r\n    Audit Findings\r\n  </div>\r\n\r\n  <div id="results">\r\n    <div class="empty">\r\n      Run your first audit to see results.\r\n    </div>\r\n  </div>\r\n\r\n  <!-- STATUS -->\r\n  <div id="status">\r\n    Ready to scan your design.\r\n  </div>\r\n\r\n  <div class="footer">\r\n    DESIGNLINT \xB7 DESIGN QUALITY CONTROL\r\n  </div>\r\n\r\n  <script>\r\n\r\n    const button = document.getElementById("audit");\r\n\r\n    const results = document.getElementById("results");\r\n\r\n    const status = document.getElementById("status");\r\n\r\n    // ======================================\r\n    // RUN AUDIT\r\n    // ======================================\r\n\r\n    button.addEventListener("click", () => {\r\n\r\n      button.disabled = true;\r\n\r\n      button.textContent = "Scanning...";\r\n\r\n      status.textContent =\r\n        "Analyzing your Figma page...";\r\n\r\n      results.innerHTML =\r\n        \'<div class="empty">Scanning design layers...</div>\';\r\n\r\n      parent.postMessage({\r\n        pluginMessage: {\r\n          type: "RUN_AUDIT"\r\n        }\r\n      }, "*");\r\n\r\n    });\r\n\r\n    // ======================================\r\n    // RECEIVE FIGMA MESSAGES\r\n    // ======================================\r\n\r\n    window.onmessage = (event) => {\r\n\r\n      const message = event.data.pluginMessage;\r\n\r\n      if (!message) return;\r\n\r\n      // ====================================\r\n      // ERROR HANDLING\r\n      // ====================================\r\n\r\n      if (message.type === "AUDIT_ERROR") {\r\n\r\n        button.disabled = false;\r\n\r\n        button.textContent = "Run Design Audit \u2192";\r\n\r\n        status.textContent =\r\n          "Audit failed. Check plugin console.";\r\n\r\n        results.innerHTML =\r\n          \'<div class="empty error">Something went wrong.</div>\';\r\n\r\n        return;\r\n      }\r\n\r\n      if (message.type !== "AUDIT_RESULTS") return;\r\n\r\n      // ====================================\r\n      // RESET BUTTON\r\n      // ====================================\r\n\r\n      button.disabled = false;\r\n\r\n      button.textContent = "Run Design Audit \u2192";\r\n\r\n      const issues = Array.isArray(message.issues)\r\n        ? message.issues\r\n        : [];\r\n\r\n      // ====================================\r\n      // MAIN STATISTICS\r\n      // ====================================\r\n\r\n      document.getElementById("total").textContent =\r\n        issues.length;\r\n\r\n      document.getElementById("scanned").textContent =\r\n        message.scanned ?? 0;\r\n\r\n      // ====================================\r\n      // COMPONENT STATISTICS\r\n      // ====================================\r\n\r\n      const components = message.componentStats || {};\r\n\r\n      document.getElementById("components").textContent =\r\n        components.components ?? 0;\r\n\r\n      document.getElementById("componentSets").textContent =\r\n        components.componentSets ?? 0;\r\n\r\n      document.getElementById("instances").textContent =\r\n        components.instances ?? 0;\r\n\r\n      document.getElementById("broken").textContent =\r\n        components.brokenInstances ?? 0;\r\n\r\n      // ====================================\r\n      // SPACING STATISTICS\r\n      // ====================================\r\n\r\n      const spacing = message.spacingStats || {};\r\n\r\n      document.getElementById("gapChecks").textContent =\r\n        spacing.gapChecks ?? 0;\r\n\r\n      document.getElementById("paddingChecks").textContent =\r\n        spacing.paddingChecks ?? 0;\r\n\r\n      // ====================================\r\n      // TYPOGRAPHY STATISTICS\r\n      // ====================================\r\n\r\n      const typography = message.typographyStats || {};\r\n\r\n      document.getElementById("textNodes").textContent =\r\n        typography.textNodes ?? 0;\r\n\r\n      document.getElementById("fontSizeChecks").textContent =\r\n        typography.fontSizeChecks ?? 0;\r\n\r\n      document.getElementById("fontFamilyChecks").textContent =\r\n        typography.fontFamilyChecks ?? 0;\r\n\r\n      document.getElementById("fontWeightChecks").textContent =\r\n        typography.fontWeightChecks ?? 0;\r\n\r\n      document.getElementById("lineHeightChecks").textContent =\r\n        typography.lineHeightChecks ?? 0;\r\n\r\n      document.getElementById("letterSpacingChecks").textContent =\r\n        typography.letterSpacingChecks ?? 0;\r\n\r\n      document.getElementById("textStyleChecks").textContent =\r\n        typography.textStyleChecks ?? 0;\r\n\r\n      // ====================================\r\n      // STATUS\r\n      // ====================================\r\n\r\n      status.textContent =\r\n        `Audit complete \xB7 ${issues.length} issues \xB7 ` +\r\n        `${spacing.gapChecks ?? 0} gap checks \xB7 ` +\r\n        `${spacing.paddingChecks ?? 0} padding checks \xB7 ` +\r\n        `${typography.textNodes ?? 0} text layers`;\r\n\r\n      // ====================================\r\n      // CLEAR PREVIOUS FINDINGS\r\n      // ====================================\r\n\r\n      results.innerHTML = "";\r\n\r\n      // ====================================\r\n      // NO ISSUES\r\n      // ====================================\r\n\r\n      if (issues.length === 0) {\r\n\r\n        results.innerHTML =\r\n          \'<div class="empty success">\u2713 No violations found!</div>\';\r\n\r\n        return;\r\n      }\r\n\r\n      // ====================================\r\n      // RENDER AUDIT FINDINGS\r\n      // ====================================\r\n\r\n      issues.forEach(issue => {\r\n\r\n        const item = document.createElement("div");\r\n\r\n        item.className = "issue";\r\n\r\n        const title = document.createElement("strong");\r\n\r\n        title.className =\r\n          issue.severity === "error"\r\n            ? "error"\r\n            : "warning";\r\n\r\n        title.textContent =\r\n          issue.category || "Design issue";\r\n\r\n        const description = document.createElement("div");\r\n\r\n        description.textContent =\r\n          issue.description || "No description available";\r\n\r\n        const node = document.createElement("small");\r\n\r\n        node.textContent =\r\n          "Layer: " + (issue.nodeName || "Unknown");\r\n\r\n        item.appendChild(title);\r\n\r\n        item.appendChild(description);\r\n\r\n        item.appendChild(node);\r\n\r\n        // CLICK TO LOCATE\r\n        item.addEventListener("click", () => {\r\n\r\n          if (!issue.nodeId) return;\r\n\r\n          parent.postMessage({\r\n            pluginMessage: {\r\n              type: "SELECT_NODE",\r\n              nodeId: issue.nodeId\r\n            }\r\n          }, "*");\r\n\r\n        });\r\n\r\n        results.appendChild(item);\r\n\r\n      });\r\n\r\n    };\r\n\r\n  <\/script>\r\n\r\n</body>\r\n</html>\r\n', {
    width: 380,
    height: 700,
    themeColors: true
  });
  var SPACING_SCALE = [
    0,
    4,
    8,
    12,
    16,
    24,
    32,
    40,
    48,
    64
  ];
  var TYPE_SCALE = [
    10,
    12,
    14,
    16,
    18,
    20,
    24,
    32,
    40,
    48
  ];
  var ALLOWED_FONT_FAMILIES = [];
  var ALLOWED_FONT_WEIGHTS = [];
  var REQUIRE_TEXT_STYLES = false;
  var REQUIRE_SPACING_VARIABLES = false;
  function isClose(value, scale, tolerance = 0.5) {
    return scale.some(
      (item) => Math.abs(item - value) <= tolerance
    );
  }
  function rgbToHex(color) {
    return "#" + [color.r, color.g, color.b].map(
      (value) => Math.round(value * 255).toString(16).padStart(2, "0")
    ).join("").toUpperCase();
  }
  function hasVariableBinding(node, property) {
    if (!("boundVariables" in node)) {
      return false;
    }
    const bindings = node.boundVariables;
    return Boolean(
      bindings && bindings[property]
    );
  }
  function addIssue(issues, node, category, description, severity = "warning") {
    issues.push({
      category,
      severity,
      description,
      nodeName: node.name,
      nodeId: node.id
    });
  }
  function getFontWeight(style) {
    var _a;
    const normalized = style.toLowerCase().replace(/[\s_-]+/g, "");
    const weights = {
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
    return (_a = weights[normalized]) != null ? _a : null;
  }
  async function runAudit() {
    const issues = [];
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
    const variables = await figma.variables.getLocalVariablesAsync("COLOR");
    const knownColors = /* @__PURE__ */ new Set();
    for (const variable of variables) {
      for (const value of Object.values(
        variable.valuesByMode
      )) {
        if (typeof value === "object" && value !== null && "r" in value && "g" in value && "b" in value) {
          knownColors.add(
            rgbToHex(value)
          );
        }
      }
    }
    function inspectPaint(paint, node) {
      var _a;
      if (paint.type !== "SOLID" || paint.visible === false) {
        return;
      }
      const hex = rgbToHex(paint.color);
      if ((_a = paint.boundVariables) == null ? void 0 : _a.color) {
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
    function inspectSpacing(node, property, value, label) {
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
      if (REQUIRE_SPACING_VARIABLES && !isBound) {
        addIssue(
          issues,
          node,
          "Spacing variable",
          `${label} (${value}px) is hardcoded instead of using a spacing variable.`
        );
      }
    }
    function inspectTypography(node) {
      typographyStats.textNodes++;
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
      if (node.fontName !== figma.mixed && typeof node.fontName !== "symbol") {
        const font = node.fontName;
        const family = font.family;
        const style = font.style;
        typographyStats.fontFamilyChecks++;
        if (ALLOWED_FONT_FAMILIES.length > 0 && !ALLOWED_FONT_FAMILIES.includes(family)) {
          addIssue(
            issues,
            node,
            "Typography / Font family",
            `Font family "${family}" is not in your approved font list.`
          );
        }
        typographyStats.fontWeightChecks++;
        const weight = getFontWeight(style);
        if (weight !== null && ALLOWED_FONT_WEIGHTS.length > 0 && !ALLOWED_FONT_WEIGHTS.includes(weight)) {
          addIssue(
            issues,
            node,
            "Typography / Font weight",
            `Font weight ${weight} (${style}) is not in your approved weight list.`
          );
        }
      }
      const lineHeight = node.lineHeight;
      if (lineHeight !== figma.mixed && typeof lineHeight === "object" && lineHeight !== null) {
        typographyStats.lineHeightChecks++;
        if (lineHeight.unit === "PIXELS" && typeof lineHeight.value === "number" && typeof node.fontSize === "number" && node.fontSize > 0) {
          const ratio = lineHeight.value / node.fontSize;
          if (ratio < 1 || ratio > 2) {
            addIssue(
              issues,
              node,
              "Typography / Line height",
              `Line height ratio ${ratio.toFixed(2)} is outside the recommended 1.0\u20132.0 range.`
            );
          }
        }
        if (lineHeight.unit === "PERCENT" && typeof lineHeight.value === "number" && (lineHeight.value < 100 || lineHeight.value > 200)) {
          addIssue(
            issues,
            node,
            "Typography / Line height",
            `Line height ${lineHeight.value}% is outside the configured 100%\u2013200% range.`
          );
        }
      }
      const letterSpacing = node.letterSpacing;
      if (letterSpacing !== figma.mixed && typeof letterSpacing === "object" && letterSpacing !== null) {
        typographyStats.letterSpacingChecks++;
        if (letterSpacing.unit === "PIXELS" && typeof letterSpacing.value === "number" && Math.abs(letterSpacing.value) > 2) {
          addIssue(
            issues,
            node,
            "Typography / Letter spacing",
            `Letter spacing ${letterSpacing.value}px exceeds the configured \xB12px threshold.`
          );
        }
        if (letterSpacing.unit === "PERCENT" && typeof letterSpacing.value === "number" && Math.abs(letterSpacing.value) > 10) {
          addIssue(
            issues,
            node,
            "Typography / Letter spacing",
            `Letter spacing ${letterSpacing.value}% exceeds the configured \xB110% threshold.`
          );
        }
      }
      typographyStats.textStyleChecks++;
      if (REQUIRE_TEXT_STYLES && (!node.textStyleId || node.textStyleId === "0")) {
        addIssue(
          issues,
          node,
          "Typography / Missing text style",
          "This text layer does not have a Figma text style applied."
        );
      }
    }
    async function inspect(node) {
      scanned++;
      if (node.type === "COMPONENT") {
        componentStats.components++;
      }
      if (node.type === "COMPONENT_SET") {
        componentStats.componentSets++;
      }
      if (node.type === "INSTANCE") {
        componentStats.instances++;
        try {
          const mainComponent = await node.getMainComponentAsync();
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
      if ("fills" in node && Array.isArray(node.fills)) {
        for (const paint of node.fills) {
          inspectPaint(paint, node);
        }
      }
      if ("strokes" in node && Array.isArray(node.strokes)) {
        for (const paint of node.strokes) {
          inspectPaint(paint, node);
        }
      }
      if ("layoutMode" in node && node.layoutMode !== "NONE") {
        if ("itemSpacing" in node && typeof node.itemSpacing === "number") {
          spacingStats.gapChecks++;
          inspectSpacing(
            node,
            "itemSpacing",
            node.itemSpacing,
            "Auto Layout gap"
          );
        }
        if ("paddingTop" in node && typeof node.paddingTop === "number") {
          spacingStats.paddingChecks++;
          inspectSpacing(
            node,
            "paddingTop",
            node.paddingTop,
            "Top padding"
          );
        }
        if ("paddingBottom" in node && typeof node.paddingBottom === "number") {
          spacingStats.paddingChecks++;
          inspectSpacing(
            node,
            "paddingBottom",
            node.paddingBottom,
            "Bottom padding"
          );
        }
        if ("paddingLeft" in node && typeof node.paddingLeft === "number") {
          spacingStats.paddingChecks++;
          inspectSpacing(
            node,
            "paddingLeft",
            node.paddingLeft,
            "Left padding"
          );
        }
        if ("paddingRight" in node && typeof node.paddingRight === "number") {
          spacingStats.paddingChecks++;
          inspectSpacing(
            node,
            "paddingRight",
            node.paddingRight,
            "Right padding"
          );
        }
      }
      if (node.type === "TEXT") {
        inspectTypography(node);
      }
      if ("children" in node) {
        for (const child of node.children) {
          await inspect(child);
        }
      }
    }
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
  figma.ui.onmessage = async (message) => {
    if (message.type === "RUN_AUDIT") {
      try {
        const result = await runAudit();
        figma.ui.postMessage(__spreadValues({
          type: "AUDIT_RESULTS"
        }, result));
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
    if (message.type === "SELECT_NODE") {
      const node = await figma.getNodeByIdAsync(
        message.nodeId
      );
      if (node && node.type !== "DOCUMENT" && node.type !== "PAGE") {
        figma.currentPage.selection = [
          node
        ];
        figma.viewport.scrollAndZoomIntoView([
          node
        ]);
      }
    }
  };
})();
