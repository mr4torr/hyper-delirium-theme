/**
 * MIT License
 *
 * Copyright (c) 2020 MailonTorres
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

"use strict";

const colors = {
  black: "#787D85",
  red: "#F07076",
  green: "#a9cfa4",
  yellow: "#ffe2a9",
  blue: "#6699cc",
  magenta: "#C8BDDE",
  cyan: "#5fb3b3",
  white: "#d7dae0",
  lightBlack: "#787D85",
  lightRed: "#F07076",
  lightGreen: "#a9cfa4",
  lightYellow: "#ffe2a9",
  lightBlue: "#6699cc",
  lightMagenta: "#5fb3b3",
  lightCyan: "#C8BDDE",
  lightWhite: "#d7dae0",

  colorCubes: "rgba(255,226,169,0.8)",
  grayscale: "#787D85",
};

const BORDER = "#363F47";
const BACKGROUND = "#263038";
const FOREGROUND = "#EDF1F2";
const SELECTION_COLOR = 'rgba(145,152,162,0.2)';
const TAB_BORDER_COLOR = "#343D4A";

const CURSOR_COLOR = colors.colorCubes;
const BORDER_COLOR = BORDER;
const TAB_TEXT_COLOR = colors.grayscale;
const TAB_BORDER_ACTIVE_COLOR = colors.colorCubes;

exports.decorateConfig = (config) => {
  let windowControlsCSS = "";
  if (config.showWindowControls) {
    windowControlsCSS = ".list_2902 { margin-left: 0 !important; }";
  }

  const delirium = config.delirium || {};
  const isWin = /^win/.test(process.platform);

  // tab border customization
  let tabBorder = "";
  let tabNoFirstChild = "";

  let headerBorderColor =
    delirium.noBorder === true || delirium.showHeaderBorder === false
      ? BACKGROUND
      : TAB_BORDER_COLOR;

  let tabBorderColor =
    delirium.noBorder === true || delirium.showTabBorder === false
      ? BACKGROUND
      : TAB_BORDER_COLOR;

  // environment specifics
  if (isWin) {
    tabBorder = `border-top: 1px solid ${tabBorderColor} !important;`;
    tabNoFirstChild = ":not(:first-child)";
  } else {
    headerBorderColor = tabBorderColor;
  }

  // header customization (windows only)
  let headerForegroundColor = colors.white;
  let headerBackgroundColor = BACKGROUND;
  if (isWin) {
    headerBackgroundColor =
      delirium.headerBackgroundColor || headerBackgroundColor;
    headerForegroundColor =
      delirium.headerForegroundColor || headerForegroundColor;
  }

  return Object.assign({}, config, {
    foregroundColor: FOREGROUND,
    backgroundColor: BACKGROUND,
    borderColor: BORDER_COLOR,
    cursorColor: CURSOR_COLOR,
    selectionColor: SELECTION_COLOR,
    colors,
    termCSS: `
          ${config.termCSS || ""}
          ::selection {
              background: ${SELECTION_COLOR} !important;
          }
          x-screen x-row {
              font-variant-ligatures: initial;
          }
          span {
              font-weight: normal !important;
          }
      `,
    css: `
      ${config.css || ""}
      ::selection {
        background: ${SELECTION_COLOR} !important;
      }
      .hyper_main {
        background: ${BACKGROUND};
        border: none !important;
      }
      .splitpane_divider {
        background-color: ${tabBorderColor} !important;
      }
      .header_header {
        color: ${headerForegroundColor} !important;
      }
      .header_header, .header_windowHeader {
        top: 0;
        left: 0;
        right: 0;
      }
      .tabs_list {
        position: relative;
        border: none;
        border-bottom: 1px solid ${tabBorderColor} !important;
      }
      .tabs_list:before {
        content: '';
        position: absolute;
        top: 0;
        left: -77px;
        height: 100%;
        background-color: rgba(0,0,0,0.1);
      }
      .header_shape {
        color: ${headerForegroundColor} !important;
      }
      .tabs_title {
        color: ${TAB_TEXT_COLOR};
      }
      .tab_tab {
        border: 0;
      }
      .tab_tab${tabNoFirstChild} {
        border-left: 1px solid ${tabBorderColor} !important;
      }
      .tab_text {
        color: ${TAB_TEXT_COLOR};
        font-size: 13px;
        font-weight: normal;
      }
      .tab_tab.tab_active {
        font-size: 13px;
        color: ${FOREGROUND} !important;
        background-color: transparent !important;
      }
      .tab_tab.tab_active:before {
        content: '';
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: ${TAB_BORDER_ACTIVE_COLOR};
      }
      .tab_textActive, .tab_icon, .tab_icon:hover {
        color: ${FOREGROUND};
      }
      ${windowControlsCSS}
    `,
  });
};
