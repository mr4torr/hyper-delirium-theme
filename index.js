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

const BORDER = "#363F47";
const BACKGROUND = "#232C33";
const FOREGROUND = "#EDF1F2";

const RED = "#F07076";
const GREEN = "#98c379";
const YELLOW = "#e5c07b";
const BLUE = "#84B0D8";
const CYAN = "#C8BDDE";
const MAGENTA = "#56b6c2";
const GRAY = "#787D85";
const BLACK = "#1E262C";
const WHITE = "#EEEEEE";
const GRAYSCALE = "#787D85";

const CURSOR_COLOR = GREEN;
const BORDER_COLOR = BORDER;

const TAB_BORDER_COLOR = "#343D4A";
const TAB_TEXT_COLOR = FOREGROUND;
const TAB_BORDER_ACTIVE_COLOR = "#FFAE57";

const colors = {
  black: BLACK,
  red: RED,
  green: GREEN,
  yellow: YELLOW,
  blue: BLUE,
  magenta: MAGENTA,
  cyan: CYAN,
  white: WHITE,
  lightWhite: "#FFFFFF",
  lightBlack: GRAY,
  lightRed: RED,
  lightGreen: GREEN,
  lightYellow: YELLOW,
  lightBlue: BLUE,
  lightMagenta: MAGENTA,
  lightCyan: CYAN,
  colorCubes: GREEN,
  grayscale: GRAYSCALE,
};

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
  let headerForegroundColor = WHITE;
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
    colors,
    css: `
      ${config.css || ""}
      .hyper_main {
        border: none !important;
      }
      .splitpane_divider {
        background-color: ${tabBorderColor} !important;
      }
      .header_header {
        background: transparent !important;
        border-bottom: none !important;
      }
      .header_header, .header_windowHeader {
        top: 0;
        left: 0;
        right: 0;
        color: ${headerForegroundColor} !important;
      }
      .tabs_list {
        position: relative;
      }
      .tabs_list:before {
        content: '';
        position: absolute;
        top: 0;
        left: -77px;
        width: 77px;
        height: 100%;
        background-color: rgba(0,0,0,0.1);
      }
      .header_shape {
        color: ${headerForegroundColor} !important;
      }
      .tabs_title {
        color: ${TAB_TEXT_COLOR};
        font-weight: 600;
      }
      .tab_tab {
        border: 0;
        ${tabBorder}
        background-color: rgba(0,0,0,0.1) !important;
      }
      .tab_tab${tabNoFirstChild} {
        border-left: 1px solid ${tabBorderColor} !important;
      }
      .tab_text {
        color: ${TAB_TEXT_COLOR};
        font-weight: normal;
      }
      .tab_tab.tab_active {
        background-color: transparent !important;
      }
      .tab_textActive {
        color: ${TAB_TEXT_COLOR};
        font-weight: 600;
      }
      .tab_icon {
        color: ${TAB_TEXT_COLOR};
        font-weight: 600;
      }
      .tab_icon:hover {
        color: ${TAB_TEXT_COLOR};
        font-weight: 600;
      }
      ${windowControlsCSS}
    `,
  });
};
