/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/Tests.mjs");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/container/Container.js":
/*!************************************!*\
  !*** ./src/container/Container.js ***!
  \************************************/
/*! exports provided: default, ContainerSlot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ContainerSlot\", function() { return ContainerSlot; });\nclass Container\n{\n  constructor(name, width, height)\n  {\n    this._name = name;\n    this._width = width;\n    this._height = height;\n\n    this._slots = new Array(this._width * this._height);\n    this._slotsOnly = new Set();\n\n    this._canPlace = true;\n    this._canExtract = true;\n\n    this._capacity = Infinity;\n  }\n\n  setEditable(canPlace, canExtract=canPlace)\n  {\n    this._canPlace = canPlace;\n    this._canExtract = canExtract;\n    return this;\n  }\n\n  setCapacity(capacity)\n  {\n    this._capacity = capacity;\n    return this;\n  }\n\n  clear()\n  {\n    this._slotsOnly.clear();\n    for(let i = 0, l = this._slots.length; i < l; ++i)\n    {\n      this._slots[i] = undefined;\n    }\n  }\n\n  onCursorInteract(cursor, slotIndex)\n  {\n    const itemStack = cursor.getEquippedItemStack();\n\n    //Is holding something...\n    if (itemStack)\n    {\n      if (!this._canPlace) return false;\n\n      return this.onCursorPlace(cursor, slotIndex, itemStack);\n    }\n    //Is holding nothing...\n    else\n    {\n      if (!this._canExtract) return false;\n      const slot = this._slots[slotIndex];\n\n      if (typeof slot == 'object')\n      {\n        return this.onCursorExtract(cursor, slotIndex);\n      }\n    }\n\n    return false;\n  }\n\n  onCursorPlace(cursor, slotIndex, itemStack)\n  {\n    const slot = this._slots[slotIndex];\n\n    //Interacting with some slot...\n    if (typeof slot == 'object')\n    {\n      //Try merging/replacing?\n      const prevStackSize = itemStack.getStackSize();\n      const result = this.addItemStack(itemStack, slotIndex, true, true, false);\n      if (result)\n      {\n        cursor.setEquippedItemStack(result);\n      }\n      else\n      {\n        cursor.removeEquippedItemStack();\n      }\n\n      return result != itemStack || prevStackSize != result.getStackSize();\n    }\n    else\n    {\n      //Put it down.\n      const prevStackSize = itemStack.getStackSize();\n      const result = this.addItemStack(itemStack, slotIndex, false, true, true);\n      if (result)\n      {\n        cursor.setEquippedItemStack(result);\n      }\n      else\n      {\n        cursor.removeEquippedItemStack();\n      }\n\n      return result != itemStack || prevStackSize != result.getStackSize();\n    }\n  }\n\n  onCursorExtract(cursor, slotIndex)\n  {\n    //Pick it up.\n    let result = this.getItemStack(slotIndex);\n\n    if (cursor.isPrecisionMode())\n    {\n      const newStackSize = result.getStackSize() - 1;\n      if (newStackSize <= 0)\n      {\n        this.removeSlot(slotIndex);\n      }\n      else\n      {\n        result.setStackSize(newStackSize);\n\n        result = result.copy();\n        result.setStackSize(1);\n      }\n    }\n    else\n    {\n      this.removeSlot(slotIndex);\n    }\n\n    cursor.setEquippedItemStack(result);\n    return true;\n  }\n\n  addItemStack(itemStack, slotIndex=-1, replace=false, merge=false, autofill=true)\n  {\n    //Ignore empty itemstacks\n    if (itemStack.isEmpty()) return null;\n\n    const item = itemStack.getItem();\n    const itemWidth = item.getWidth();\n    const itemHeight = item.getHeight();\n    const containerWidth = this._width;\n    const containerHeight = this._height;\n\n    if (slotIndex < 0)\n    {\n      //Prioritize merging first!\n      if (!autofill) throw new Error(\"Must provide valid slot index; enable autofill for automatic placement\");\n\n      //If allowed...\n      if (merge)\n      {\n        itemStack = this.tryMergeItemStack(itemStack);\n        if (!itemStack) return null;\n      }\n    }\n    else\n    {\n      //Prioritize slotIndex first!\n      itemStack = this.tryPlaceItemStack(itemStack, slotIndex, replace, merge);\n      if (!itemStack) return null;\n    }\n\n    //Try autofill the item if able to\n    if (autofill)\n    {\n      itemStack = this.tryFillItemStack(itemStack, false);\n      if (!itemStack) return null;\n    }\n\n    return itemStack;\n  }\n\n  tryMergeItemStack(itemStack)\n  {\n    for(const slot of this._slotsOnly)\n    {\n      if (slot.getItemStack().merge(itemStack, this._capacity) && itemStack.isEmpty())\n      {\n        return null;\n      }\n    }\n    return itemStack;\n  }\n\n  tryPlaceItemStack(itemStack, slotIndex, replace=false, merge=true)\n  {\n    const containerWidth = this._width;\n\n    const item = itemStack.getItem();\n    const itemWidth = item.getWidth();\n    const itemHeight = item.getHeight();\n\n    //Make sure the itemstack's slot index would be within container bounds\n    slotIndex = this.checkBounds(slotIndex, itemWidth, itemHeight);\n\n    //Item dimensions exceeds bounds\n    if (slotIndex < 0) return itemStack;\n\n    //Check collision with other slots\n    let willReplace = undefined;\n    let slot;\n    for(let y = 0, h = itemHeight; y < h; ++y)\n    {\n      for(let x = 0, w = itemWidth; x < w; ++x)\n      {\n        slot = this._slots[slotIndex + (x + y * containerWidth)];\n\n        //Found collision...\n        if (typeof slot == 'object')\n        {\n          //Try merging both itemstacks...\n          if (merge && slot.getItemStack().merge(itemStack, this._capacity))\n          {\n            return itemStack.isEmpty() ? null : itemStack;\n          }\n          //If have not yet attempted to replace anything...\n          else if (replace)\n          {\n            if (willReplace == undefined)\n            {\n              willReplace = slot;\n\n            }\n            else if (willReplace === slot)\n            {\n              //Do nothing, it's fine.\n            }\n            else\n            {\n              //Just give up.\n              return itemStack;\n            }\n\n            //Skip the current item\n            x += slot.getWidth() - 1;\n          }\n          //If not replacing or trying to replace more than 1 itemstack...\n          else\n          {\n            //Just give up :(\n            return itemStack;\n          }\n        }\n      }\n    }\n\n    //Should only get here if itemstack can be put down at slot index\n    //(either by replacement or placement)\n    let result = null;\n    if (typeof willReplace == 'object')\n    {\n      result = willReplace.move(slotIndex, itemStack);\n    }\n    else\n    {\n      this.addSlot(slotIndex, itemStack);\n    }\n    return result;\n  }\n\n  tryFillItemStack(itemStack, merge=true)\n  {\n    const containerWidth = this._width;\n    const containerHeight = this._height;\n\n    const item = itemStack.getItem();\n    const itemWidth = item.getWidth();\n    const itemHeight = item.getHeight();\n\n    let slot;\n    for(let i = 0, l = this._slots.length; i < l; ++i)\n    {\n      //Don't check borders\n      if ((i % containerWidth) + itemWidth > containerWidth) continue;\n      if ((i / containerHeight) + itemHeight > containerHeight) continue;\n\n      slot = this._slots[i];\n\n      //Found collision...\n      if (typeof slot == 'object')\n      {\n        //Try merging both itemstacks...\n        if (merge && slot.getItemStack().merge(itemStack, this._capacity))\n        {\n          //If completely merged, we done it! Success!\n          if (itemStack.isEmpty()) return null;\n\n          //Otherwise, just continue...\n        }\n        else\n        {\n          //Skip the current item\n          i += slot.getWidth() - 1;\n        }\n      }\n      else if (this.isEmptySlot(i, itemWidth, itemHeight))\n      {\n        //Found empty space! Success!\n        this.addSlot(i, itemStack);\n        return null;\n      }\n      else\n      {\n        //Skip the non-empty space\n        i += itemWidth - 1;\n      }\n    }\n\n    return itemStack;\n  }\n\n  putItemStack(itemStack, slotIndex=0, replace=true)\n  {\n    if (slotIndex < 0) throw new Error(\"Cannot autofill itemstack for putItemStack(); use addItemStack() instead\");\n    return this.addItemStack(itemStack, slotIndex, replace, false);\n  }\n\n  getItemStack(slotIndex=0)\n  {\n    const slot = this._slots[slotIndex];\n    return typeof slot == 'object' ? slot.getItemStack() : null;\n  }\n\n  addSlot(slotIndex, itemStack)\n  {\n    const result = new ContainerSlot(this, slotIndex);\n    result.setItemStack(itemStack);\n    this._slotsOnly.add(result);\n    return result;\n  }\n\n  removeSlot(slotIndex)\n  {\n    const slot = this._slots[slotIndex];\n    if (typeof slot == 'object')\n    {\n      slot.clear();\n      this._slotsOnly.delete(slot);\n    }\n    return slot;\n  }\n\n  getSlot(slotIndex)\n  {\n    return this._slots[slotIndex];\n  }\n\n  checkBounds(slotIndex, width=1, height=1)\n  {\n    const containerWidth = this._width;\n    const containerHeight = this._height;\n\n    let x = slotIndex % containerWidth;\n    let y = Math.floor(slotIndex / containerWidth);\n    if (x < 0) x = 0;\n    if (x + width > containerWidth)\n    {\n      x = containerWidth - width;\n      if (x < 0) return -1;\n    }\n    if (y < 0) y = 0;\n    if (y + height > containerHeight)\n    {\n      y = containerHeight - height;\n      if (y < 0) return -1;\n    }\n\n    return x + y * containerWidth;\n  }\n\n  isEmptySlot(slotIndex, width=1, height=1)\n  {\n    const containerWidth = this._width;\n    let slot;\n    for(let y = 0; y < height; ++y)\n    {\n      for(let x = 0; x < width; ++x)\n      {\n        slot = this._slots[slotIndex + (x + y * containerWidth)];\n        if (typeof slot == 'object')\n        {\n          return false;\n        }\n      }\n    }\n    return true;\n  }\n\n  getSlots()\n  {\n    return this._slotsOnly;\n  }\n\n  getSlotCapacity()\n  {\n    return this._capacity;\n  }\n\n  isEditable()\n  {\n    return this._canPlace && this._canExtract;\n  }\n\n  //Interactible container width\n  getWidth()\n  {\n    return this._width;\n  }\n\n  //Interactible container height\n  getHeight()\n  {\n    return this._height;\n  }\n\n  getName()\n  {\n    return this._name;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Container);\n\nclass ContainerSlot\n{\n  constructor(parent, index)\n  {\n    this._parent = parent;\n    this._index = index;\n\n    this._itemStack = null;\n    this._width = 0;\n    this._height = 0;\n  }\n\n  clear()\n  {\n    if (!this._itemStack) return;\n\n    //Remove from the container's slots\n    const container = this._parent;\n    const containerWidth = container._width;\n    const item = this._itemStack.getItem();\n    const w = this._width;\n    const h = this._height;\n    const i = this._index;\n\n    for(let y = 0; y < h; ++y)\n    {\n      for(let x = 0; x < w; ++x)\n      {\n        container._slots[i + (x + y * containerWidth)] = undefined;\n      }\n    }\n\n    //Reset values\n    this._itemStack = null;\n    this._width = 0;\n    this._height = 0;\n  }\n\n  //Assumes slot index is within bounds of the container\n  //Returns the itemstack before move/replace\n  move(slotIndex, newItemStack=null)\n  {\n    const itemStack = this._itemStack;\n    if (itemStack)\n    {\n      //Clear from previous position in the container's slots\n      this.clear();\n    }\n\n    //Move to new index\n    this._index = slotIndex;\n\n    //Set to new position in the container's slots\n    this.setItemStack(newItemStack || itemStack);\n    return itemStack;\n  }\n\n  setItemStack(itemStack)\n  {\n    const prev = this._itemStack;\n\n    if (!itemStack)\n    {\n      this.clear();\n      return prev;\n    }\n\n    const container = this._parent;\n    const containerWidth = container._width;\n    const i = this._index;\n\n    const item = itemStack.getItem();\n    const w = item.getWidth();\n    const h = item.getHeight();\n\n    const mw = Math.max(w, this._width);\n    const mh = Math.max(h, this._height);\n\n    //Add to the container's slots\n    let result;\n    for(let y = 0; y < mh; ++y)\n    {\n      for(let x = 0; x < mw; ++x)\n      {\n        result = x < w && y < h ? this : undefined;\n        container._slots[i + (x + y * containerWidth)] = result;\n      }\n    }\n\n    this._itemStack = itemStack;\n    this._width = w;\n    this._height = h;\n    return prev;\n  }\n\n  getItemStack()\n  {\n    return this._itemStack;\n  }\n\n  getRootIndex()\n  {\n    return this._index;\n  }\n\n  getWidth()\n  {\n    return this._width;\n  }\n\n  getHeight()\n  {\n    return this._height;\n  }\n\n  getContainer()\n  {\n    return this._parent;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/container/Container.js?");

/***/ }),

/***/ "./src/crafting/CraftingRecipe.js":
/*!****************************************!*\
  !*** ./src/crafting/CraftingRecipe.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var item_ItemStack_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! item/ItemStack.js */ \"./src/item/ItemStack.js\");\n\n\nclass CraftingRecipe\n{\n  constructor(pattern, itemMap, outputItem, outputAmount=1, outputMetadata=0)\n  {\n    this.pattern = pattern.replace(/\\s/g, '');\n    this.itemMap = itemMap;\n\n    this.outputItem = outputItem;\n    this.outputAmount = outputAmount;\n    this.outputMetadata = outputMetadata;\n  }\n\n  applyRecipe(container)\n  {\n    const usedSlots = this.matches(container);\n    if (usedSlots)\n    {\n      const result = this.getResult(usedSlots);\n      for(let slot of usedSlots)\n      {\n        const itemStack = slot.getItemStack();\n        itemStack.getItem().onCraftResult(itemStack, slot, container, this, result);\n      }\n      return result;\n    }\n    else\n    {\n      return null;\n    }\n  }\n\n  matches(container, pattern=this.pattern, dst=[])\n  {\n    const containerWidth = container.getWidth();\n    const containerHeight = container.getHeight();\n\n    for(let j = 0; j < containerHeight; ++j)\n    {\n      for(let i = 0; i < containerWidth; ++i)\n      {\n        const result = this.matchesPattern(container, pattern, this.itemMap, i, j, dst);\n        if (result && result.length > 0)\n        {\n          for(const slot of result)\n          {\n            dst.push(slot);\n          }\n          return dst;\n        }\n      }\n    }\n\n    return null;\n  }\n\n  matchesPattern(container, pattern, itemMap, offsetX, offsetY, used=[])\n  {\n    const containerWidth = container.getWidth();\n    const containerHeight = container.getHeight();\n\n    const dst = [];\n    const patternLength = pattern.length;\n    let symbolIndex = 0;\n    let symbol;\n    let x = offsetX;\n    let y = offsetY;\n    while(symbolIndex < patternLength)\n    {\n      symbol = pattern[symbolIndex++];\n\n      //console.log(x, y, symbol);\n\n      switch(symbol)\n      {\n        case ',':\n          //Go to the next line...\n          ++y;\n          x = offsetX - 1;\n          break;\n        case '&':\n          //Try another pattern...\n          const result = this.matches(container, pattern.substring(symbolIndex), dst.concat(used));\n          if (result)\n          {\n            for(const slot of result)\n            {\n              dst.push(slot);\n            }\n            return dst;\n          }\n          else\n          {\n            return null;\n          }\n          break;\n        case '*':\n          //Ignore whatever this is and continue...\n          break;\n        case '.':\n          //This is something already read...\n          if (!dst.includes(container.getSlot(x + y * containerWidth)))\n          {\n            return null;\n          }\n          break;\n        case '_':\n          if (container.getSlot(x + y * containerWidth))\n          {\n            return null;\n          }\n          break;\n        default:\n          const slot = container.getSlot(x + y * containerWidth);\n          if (slot)\n          {\n            const itemStack = slot.getItemStack();\n            const item = itemMap[symbol];\n            if (item === itemStack.getItem())\n            {\n              if (dst.includes(slot))\n              {\n                throw new Error(\"Invalid pattern spacing\");\n              }\n\n              //Check if already used by OTHER crafting patterns\n              let stackSize = itemStack.getStackSize();\n              let index = used.indexOf(slot);\n              while (index >= 0)\n              {\n                --stackSize;\n                //Still enough of item left to take...\n                if (stackSize > 0)\n                {\n                  index = used.indexOf(slot, index + 1);\n                }\n                //Not enough of stack size\n                else\n                {\n                  return null;\n                }\n              }\n              dst.push(slot);\n            }\n            else\n            {\n              return null;\n            }\n          }\n          else\n          {\n            return null;\n          }\n      }\n\n      ++x;\n    }\n\n    //Out of symbols...\n    return dst;\n  }\n\n  getResult(usedSlots)\n  {\n    return new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.outputItem, this.outputAmount, this.outputMetadata);\n  }\n\n  static isPatternSymbol(symbol)\n  {\n    return symbol != '&' && symbol != '_' && symbol != '|' && symbol != '^' && symbol != ',' && symbol != '*' && symbol != '.';\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CraftingRecipe);\n\n\n//# sourceURL=webpack:///./src/crafting/CraftingRecipe.js?");

/***/ }),

/***/ "./src/crafting/CraftingRegistry.js":
/*!******************************************!*\
  !*** ./src/crafting/CraftingRegistry.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst RECIPES = [];\n\nclass CraftingRegistry\n{\n  static registerRecipe(craftingRecipe)\n  {\n    RECIPES.push(craftingRecipe);\n    return craftingRecipe;\n  }\n\n  static unregisterRecipe(craftingRecipe)\n  {\n    RECIPES.splice(RECIPES.indexOf(craftingRecipe), 1);\n    return craftingRecipe;\n  }\n\n  static getRecipes()\n  {\n    return RECIPES;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CraftingRegistry);\n\n\n//# sourceURL=webpack:///./src/crafting/CraftingRegistry.js?");

/***/ }),

/***/ "./src/item/Item.js":
/*!**************************!*\
  !*** ./src/item/Item.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Item\n{\n  constructor(name)\n  {\n    this._name = name;\n    this._texture = \"images/300.png\";\n    this._color = 0x00000000;\n\n    this._width = 1;\n    this._height = 1;\n\n    this._maxStackSize = 64;\n\n    this._baseValue = 1;\n  }\n\n  setTextureName(textureName)\n  {\n    this._texture = textureName;\n    return this;\n  }\n\n  setBaseColor(color)\n  {\n    this._color = color;\n    return this;\n  }\n\n  setBaseValue(value)\n  {\n    if (value < 0) throw new Error(\"item base value must be a non-negative integer\");\n\n    this._baseValue = value;\n    return this;\n  }\n\n  setSize(width=1, height=1)\n  {\n    if (width <= 0) throw new Error(\"item width must be a positive integer\");\n    if (height <= 0) throw new Error(\"item height must be a positive integer\");\n\n    this._width = width;\n    this._height = height;\n    return this;\n  }\n\n  setMaxStackSize(stackSize)\n  {\n    this._maxStackSize = stackSize;\n    return this;\n  }\n\n  onCraftResult(itemStack, itemSlot, craftingContainer, recipe, resultItem)\n  {\n    const newStackSize = itemStack.getStackSize() - 1;\n    if (newStackSize <= 0)\n    {\n      craftingContainer.removeSlot(itemSlot.getRootIndex());\n    }\n    else\n    {\n      itemStack.setStackSize(newStackSize);\n    }\n  }\n\n  getWidth()\n  {\n    return this._width;\n  }\n\n  getHeight()\n  {\n    return this._height;\n  }\n\n  getMaxStackSize()\n  {\n    return this._maxStackSize;\n  }\n\n  getBaseValue()\n  {\n    return this._baseValue;\n  }\n\n  getBaseColor()\n  {\n    return this._color;\n  }\n\n  getTextureName()\n  {\n    return this._texture;\n  }\n\n  getName()\n  {\n    return this._name;\n  }\n\n  getUnlocalizedName()\n  {\n    return \"item.\" + this._name;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Item);\n\n\n//# sourceURL=webpack:///./src/item/Item.js?");

/***/ }),

/***/ "./src/item/ItemRegistry.js":
/*!**********************************!*\
  !*** ./src/item/ItemRegistry.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst ITEMS = new Map();\n\nclass ItemRegistry\n{\n  static registerItem(item)\n  {\n    ITEMS.set(item.getName(), item);\n    return item;\n  }\n\n  static unregisterItem(itemName)\n  {\n    const result = ITEMS.get(itemName);\n    ITEMS.delete(itemName);\n    return result;\n  }\n\n  static getItems()\n  {\n    return ITEMS.values();\n  }\n\n  static getItem(itemName)\n  {\n    if (!ITEMS.has(itemName)) throw new Error(\"Cannot find item with name \\'\" + itemName + \"\\'\");\n    return ITEMS.get(itemName);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ItemRegistry);\n\n\n//# sourceURL=webpack:///./src/item/ItemRegistry.js?");

/***/ }),

/***/ "./src/item/ItemStack.js":
/*!*******************************!*\
  !*** ./src/item/ItemStack.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var util_MathHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! util/MathHelper.js */ \"./src/util/MathHelper.js\");\n\n\nclass ItemStack\n{\n  constructor(item, stackSize=1, metadata=0)\n  {\n    this._id = Object(util_MathHelper_js__WEBPACK_IMPORTED_MODULE_0__[\"guid\"])();\n\n    //The item in the stack\n    this._item = item;\n\n    //Number of items in the stack\n    this._stackSize = stackSize;\n\n    //Used by other item logic, ie durability\n    this._metadata = metadata;\n\n    //Used by other item logic, ie color\n    //this._variance = 0;\n    //4 bits for Hue\n    //4 bits for saturation\n    //4 bits for Lightness\n    //4 bits for quality\n\n    //The quality of the items in the stack\n    //this._quality = 0;\n\n    //16-bits\n    //0000 0000 0000 0000\n  }\n\n  setStackSize(stackSize)\n  {\n    this._stackSize = stackSize;\n    return this;\n  }\n\n  setMetadata(metadata)\n  {\n    this._metadata = metadata;\n    return this;\n  }\n\n  setItem(item)\n  {\n    this._item = item;\n    return this;\n  }\n\n  setQuality(quality)\n  {\n    this._quality = quality;\n    return this;\n  }\n\n  copy()\n  {\n    const result = new ItemStack(this._item, this._stackSize, this._metadata);\n    return result;\n  }\n\n  merge(itemStack, capacity=Infinity)\n  {\n    const item = this.getItem();\n    const otherItem = itemStack.getItem();\n    if (item !== otherItem) return false;\n    if (this._metadata !== itemStack._metadata) return false;\n\n    const maxSize = Math.min(item.getMaxStackSize(), capacity);\n    const stackSize = this._stackSize;\n    if (stackSize < maxSize)\n    {\n      const otherSize = itemStack._stackSize;\n      const newStackSize = stackSize + otherSize;\n      const remaining = newStackSize - maxSize;\n\n      //If can fit the entire stack...\n      if (remaining <= 0)\n      {\n        this.setStackSize(newStackSize);\n        itemStack.setStackSize(0);\n        return true;\n      }\n      //Fit some of it at least...\n      else\n      {\n        this.setStackSize(maxSize);\n        itemStack.setStackSize(remaining);\n        return true;\n      }\n    }\n    else\n    {\n      //No more room to merge\n      return false;\n    }\n  }\n\n  overflow(capacity)\n  {\n    const diffSize = this._stackSize - capacity;\n\n    //Try splitting...\n    if (diffSize > 0)\n    {\n      const result = this.copy();\n      result.setStackSize(diffSize);\n      this.setStackSize(capacity);\n      return result;\n    }\n\n    return null;\n  }\n\n  getItem()\n  {\n    return this._item;\n  }\n\n  addStackSize(stackSize)\n  {\n    this._stackSize += stackSize;\n  }\n\n  getStackSize()\n  {\n    return this._stackSize;\n  }\n\n  isEmpty()\n  {\n    return this._stackSize <= 0;\n  }\n\n  getMetadata()\n  {\n    return this._metadata;\n  }\n\n  getQuality()\n  {\n    return this._quality;\n  }\n\n  getID()\n  {\n    return this._id;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ItemStack);\n\n\n//# sourceURL=webpack:///./src/item/ItemStack.js?");

/***/ }),

/***/ "./src/util/MathHelper.js":
/*!********************************!*\
  !*** ./src/util/MathHelper.js ***!
  \********************************/
/*! exports provided: guid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"guid\", function() { return guid; });\nfunction guid()\n{\n  function s4()\n  {\n    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);\n  }\n\n  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();\n};\n\n\n//# sourceURL=webpack:///./src/util/MathHelper.js?");

/***/ }),

/***/ "./test/CraftingTest.mjs":
/*!*******************************!*\
  !*** ./test/CraftingTest.mjs ***!
  \*******************************/
/*! no exports provided */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var item_ItemRegistry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! item/ItemRegistry.js */ \"./src/item/ItemRegistry.js\");\n/* harmony import */ var item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! item/ItemStack.js */ \"./src/item/ItemStack.js\");\n/* harmony import */ var item_Item_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! item/Item.js */ \"./src/item/Item.js\");\n/* harmony import */ var crafting_CraftingRegistry_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! crafting/CraftingRegistry.js */ \"./src/crafting/CraftingRegistry.js\");\n/* harmony import */ var crafting_CraftingRecipe_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! crafting/CraftingRecipe.js */ \"./src/crafting/CraftingRecipe.js\");\n/* harmony import */ var container_Container_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! container/Container.js */ \"./src/container/Container.js\");\n\n\n\n\n\n\n\nconsole.log(\"Registering items...\");\nconst ROCK = item_ItemRegistry_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerItem(new item_Item_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"rock\")).setSize(1, 1);\nconst STICK = item_ItemRegistry_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerItem(new item_Item_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"stick\")).setSize(1, 2);\nconst PLANK = item_ItemRegistry_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerItem(new item_Item_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"plank\")).setSize(2, 1);\nconst WOOD = item_ItemRegistry_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerItem(new item_Item_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"wood\")).setSize(2, 2);\nconst LOG = item_ItemRegistry_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerItem(new item_Item_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"log\")).setSize(3, 2);\nconst ITEMS = {\n  X: ROCK,\n  Y: STICK,\n  Z: PLANK,\n  W: WOOD,\n  A: LOG\n}\nconsole.log(\"Creating container...\");\nconst CONTAINER = new container_Container_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](\"inv\", 5, 5);\n\nfunction testRecipe(container, pattern)\n{\n  const recipe = new crafting_CraftingRecipe_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](pattern, ITEMS, ROCK, 1);\n  const result = recipe.matches(container);\n  if (!result || result.length <= 0)\n  {\n    console.error(\"= Failed for pattern: \" + pattern);\n  }\n  else\n  {\n    console.log(\"= Success!\");\n  }\n}\n\nconsole.log(\"Testing recipes...\");\n{\n  CONTAINER.clear();\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ROCK), 0);\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ROCK), 1);\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ROCK), 2);\n  testRecipe(CONTAINER, \"XXX\");\n}\n{\n  CONTAINER.clear();\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](LOG), 0);\n  testRecipe(CONTAINER, \"A..,...\");\n\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ROCK), 3);\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ROCK), 8);\n  testRecipe(CONTAINER, \"A..X,...X\");\n}\n{\n  CONTAINER.clear();\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](LOG), 0);\n  testRecipe(CONTAINER, \"A..,...\");\n\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](STICK), 3);\n  testRecipe(CONTAINER, \"A..Y,....\");\n}\n{\n  CONTAINER.clear();\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](LOG), 2);\n  testRecipe(CONTAINER, \"A..,...\");\n}\n{\n  CONTAINER.clear();\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](LOG), 1);\n  testRecipe(CONTAINER, \"A..,...\");\n\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](STICK), 4);\n  testRecipe(CONTAINER, \"A..Y,....\");\n}\n{\n  CONTAINER.clear();\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](PLANK), 0);\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](PLANK), 2);\n  testRecipe(CONTAINER, \"Z.Z.\");\n}\n{\n  CONTAINER.clear();\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](PLANK), 0);\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](PLANK), 2);\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](STICK), 5);\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](STICK), 6);\n  testRecipe(CONTAINER, \"Z.Z.,YY,..\");\n}\n{\n  CONTAINER.clear();\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](PLANK), 0);\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](PLANK), 2);\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](STICK), 5);\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](STICK), 8);\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](PLANK), 15);\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](PLANK), 17);\n  testRecipe(CONTAINER, \"Z.Z.,Y**Y,.**.,Z.Z.\");\n}\n{\n  CONTAINER.clear();\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](PLANK), 0);\n  CONTAINER.addItemStack(new item_ItemStack_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](STICK), 5);\n  testRecipe(CONTAINER, \"Z&Y\");\n}\n\n\n//# sourceURL=webpack:///./test/CraftingTest.mjs?");

/***/ }),

/***/ "./test/Tests.mjs":
/*!************************!*\
  !*** ./test/Tests.mjs ***!
  \************************/
/*! no exports provided */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CraftingTest_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CraftingTest.mjs */ \"./test/CraftingTest.mjs\");\n\n\n\n//# sourceURL=webpack:///./test/Tests.mjs?");

/***/ })

/******/ });