#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const { load } = require("cheerio");

const mainAxisMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  "space-around": "justify-around",
  "space-between": "justify-between",
  "space-evenly": "justify-evenly",
};

const crossAxisMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

const fxAttributes = ["fxFill", "fxLayout", "fxLayoutAlign", "fxGap", "fxFlex"];

function convertFlexLayoutToTailwind(filePath) {
  const html = fs.readFileSync(filePath, "utf-8");
  return extractHtmlTags(html).reduce(
    (html, tag) => html.replace(tag, convertTag(tag)),
    html
  );
}

function convertTag(tag) {
  if (!fxAttributes.some((a) => tag.includes(a))) return tag;

  const $ = load(tag, { xmlMode: true, decodeEntities: false });

  $("[fxLayout], [fxLayoutGap], [fxLayoutAlign]").each((_, element) => {
    const $element = $(element);

    const fxLayout = $element.attr("fxLayout");
    const fxLayoutGap = $element.attr("fxLayoutGap");
    const fxLayoutAlign = $element.attr("fxLayoutAlign");

    if (fxLayout) {
      convertFxLayoutToTailwind($element, fxLayout);
    }

    if (fxLayoutGap) {
      convertFxLayoutGapToTailwind($element, fxLayout, fxLayoutGap);
    }

    if (fxLayoutAlign) {
      const [mainAxis, crossAxis] = fxLayoutAlign.split(" ");

      if (mainAxis !== "start" && crossAxis !== "start") {
        $element
          .addClass(
            `${mainAxisMap[mainAxis] || ""} ${crossAxisMap[crossAxis] || ""}`
          )
          .removeAttr("fxLayoutAlign");
      } else if (mainAxis !== "start") {
        $element
          .addClass(`${mainAxisMap[mainAxis] || ""}`)
          .removeAttr("fxLayoutAlign");
      } else {
        $element
          .addClass(crossAxisMap[crossAxis] || "")
          .removeAttr("fxLayoutAlign");
      }
    }
  });

  $("[fxFlex]").each((_, elem) => {
    let fxFlex = $(elem).attr("fxFlex");

    if (!fxFlex) {
      $(elem).addClass(`flex-1`).removeAttr("fxFlex");
      return;
    }

    let widthClass = "";
    switch (+fxFlex) {
      case 33:
        widthClass = "1/3";
        break;
      case 66:
        widthClass = "2/3";
        break;
      case 100:
        widthClass = "full";
        break;
      default:
        widthClass = percentageToFraction(+fxFlex);
        break;
    }

    $(elem).addClass(`basis-${widthClass}`).removeAttr("fxFlex");
  });

  $("[fxFill]").each((_, elem) => {
    $(elem)
      .addClass(`h-full w-full min-h-full min-w-full`)
      .removeAttr("fxFill");
  });

  let newTag = $.html();
  newTag = newTag.replace(/(\W\w+)=""/gm, "$1");

  if (newTag.endsWith("/>") && tag.endsWith("/>")) {
    return newTag;
  } else {
    return newTag.slice(0, -2) + ">";
  }
}

function convertFxLayoutToTailwind($element, fxLayout) {
  let [layout, other] = (fxLayout || "column").split(" ");

  let className = "";
  switch (layout) {
    case "row":
      className = "flex-row";
      break;
    case "column":
      className = "flex-col";
      break;
    case "row-reverse":
      className = "flex-row-reverse";
      break;
    case "column-reverse":
      className = "flex-col-reverse";
      break;
    default:
      return;
  }

  $element.addClass(`flex ${className}`);

  if (other === "wrap") {
    $element.addClass("flex-wrap");
  }

  if (other === "inline") {
    $element.removeClass("flex");
    $element.addClass("inline-flex");
  }

  $element.removeAttr("fxLayout");
}

function convertFxLayoutGapToTailwind($element, fxLayout, fxLayoutGap) {
  let [layout] = (fxLayout || "column").split(" ");

  if (fxLayoutGap === undefined) return;

  const spacing = Math.ceil(parseFloat(fxLayoutGap) * 4); // convert from em

  if (layout === "row") {
    $element.addClass(`space-x-${spacing}`);
  } else {
    $element.addClass(`space-y-${spacing}`);
  }

  $element.removeAttr("fxLayoutGap");
}

function gcd(a, b) {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
}

function percentageToFraction(percentage) {
  const denominator = 100;
  const numerator = percentage;
  const gcdValue = gcd(numerator, denominator);
  const simplifiedNumerator = numerator / gcdValue;
  const simplifiedDenominator = denominator / gcdValue;
  return `${simplifiedNumerator}/${simplifiedDenominator}`;
}

function extractHtmlTags(html) {
  let openingTags = [];
  let tag = "";
  let inTag = false;
  let quote = null;

  for (const ch of [...html]) {
    if (!inTag && ch === "<") {
      inTag = true;
      tag += ch;
    } else if (inTag) {
      tag += ch;

      if (quote === null && (ch === '"' || ch === "'")) {
        quote = ch;
      } else if (quote !== null && ch === quote) {
        quote = null;
      } else if (quote === null && ch === ">") {
        openingTags.push(tag);
        tag = "";
        inTag = false;
      }
    }
  }

  return openingTags;
}

function convertFile(filePath) {
  const convertedData = convertFlexLayoutToTailwind(filePath);
  fs.writeFileSync(filePath, convertedData, "utf-8");
  console.log(`File converted successfully: ${filePath}`);
}

function processFiles(folderPath, processFile, processFolder, level = 0) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const currentPath = path.join(folderPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        if (
          currentPath.endsWith("node_modules") ||
          currentPath.endsWith("dist")
        ) {
          return;
        }

        if (processFiles(currentPath, processFile, processFolder, level + 1)) {
          processFolder?.(currentPath);
        }
      } else {
        if (currentPath.endsWith(".html")) {
          processFile(currentPath, level);
        }
      }
    });
    return true;
  } else {
    return false;
  }
}

processFiles(".", convertFile);
