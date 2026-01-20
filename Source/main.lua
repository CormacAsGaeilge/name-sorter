-- These imports were added automatically

import "CoreLibs/graphics"

-- End of automatic imports

--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]

local ____modules = {}
local ____moduleCache = {}
local ____originalRequire = require
local function require(file, ...)
    if ____moduleCache[file] then
        return ____moduleCache[file].value
    end
    if ____modules[file] then
        local module = ____modules[file]
        local value = nil
        if (select("#", ...) > 0) then value = module(...) else value = module(file) end
        ____moduleCache[file] = { value = value }
        return value
    else
        if ____originalRequire then
            return ____originalRequire(file)
        else
            error("module '" .. file .. "' not found")
        end
    end
end
____modules = {
["lualib_bundle"] = function(...) 
local function __TS__ArrayAt(self, relativeIndex)
    local absoluteIndex = relativeIndex < 0 and #self + relativeIndex or relativeIndex
    if absoluteIndex >= 0 and absoluteIndex < #self then
        return self[absoluteIndex + 1]
    end
    return nil
end

local function __TS__ArrayIsArray(value)
    return type(value) == "table" and (value[1] ~= nil or next(value) == nil)
end

local function __TS__ArrayConcat(self, ...)
    local items = {...}
    local result = {}
    local len = 0
    for i = 1, #self do
        len = len + 1
        result[len] = self[i]
    end
    for i = 1, #items do
        local item = items[i]
        if __TS__ArrayIsArray(item) then
            for j = 1, #item do
                len = len + 1
                result[len] = item[j]
            end
        else
            len = len + 1
            result[len] = item
        end
    end
    return result
end

local __TS__Symbol, Symbol
do
    local symbolMetatable = {__tostring = function(self)
        return ("Symbol(" .. (self.description or "")) .. ")"
    end}
    function __TS__Symbol(description)
        return setmetatable({description = description}, symbolMetatable)
    end
    Symbol = {
        asyncDispose = __TS__Symbol("Symbol.asyncDispose"),
        dispose = __TS__Symbol("Symbol.dispose"),
        iterator = __TS__Symbol("Symbol.iterator"),
        hasInstance = __TS__Symbol("Symbol.hasInstance"),
        species = __TS__Symbol("Symbol.species"),
        toStringTag = __TS__Symbol("Symbol.toStringTag")
    }
end

local function __TS__ArrayEntries(array)
    local key = 0
    return {
        [Symbol.iterator] = function(self)
            return self
        end,
        next = function(self)
            local result = {done = array[key + 1] == nil, value = {key, array[key + 1]}}
            key = key + 1
            return result
        end
    }
end

local function __TS__ArrayEvery(self, callbackfn, thisArg)
    for i = 1, #self do
        if not callbackfn(thisArg, self[i], i - 1, self) then
            return false
        end
    end
    return true
end

local function __TS__ArrayFill(self, value, start, ____end)
    local relativeStart = start or 0
    local relativeEnd = ____end or #self
    if relativeStart < 0 then
        relativeStart = relativeStart + #self
    end
    if relativeEnd < 0 then
        relativeEnd = relativeEnd + #self
    end
    do
        local i = relativeStart
        while i < relativeEnd do
            self[i + 1] = value
            i = i + 1
        end
    end
    return self
end

local function __TS__ArrayFilter(self, callbackfn, thisArg)
    local result = {}
    local len = 0
    for i = 1, #self do
        if callbackfn(thisArg, self[i], i - 1, self) then
            len = len + 1
            result[len] = self[i]
        end
    end
    return result
end

local function __TS__ArrayForEach(self, callbackFn, thisArg)
    for i = 1, #self do
        callbackFn(thisArg, self[i], i - 1, self)
    end
end

local function __TS__ArrayFind(self, predicate, thisArg)
    for i = 1, #self do
        local elem = self[i]
        if predicate(thisArg, elem, i - 1, self) then
            return elem
        end
    end
    return nil
end

local function __TS__ArrayFindIndex(self, callbackFn, thisArg)
    for i = 1, #self do
        if callbackFn(thisArg, self[i], i - 1, self) then
            return i - 1
        end
    end
    return -1
end

local __TS__Iterator
do
    local function iteratorGeneratorStep(self)
        local co = self.____coroutine
        local status, value = coroutine.resume(co)
        if not status then
            error(value, 0)
        end
        if coroutine.status(co) == "dead" then
            return
        end
        return true, value
    end
    local function iteratorIteratorStep(self)
        local result = self:next()
        if result.done then
            return
        end
        return true, result.value
    end
    local function iteratorStringStep(self, index)
        index = index + 1
        if index > #self then
            return
        end
        return index, string.sub(self, index, index)
    end
    function __TS__Iterator(iterable)
        if type(iterable) == "string" then
            return iteratorStringStep, iterable, 0
        elseif iterable.____coroutine ~= nil then
            return iteratorGeneratorStep, iterable
        elseif iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            return iteratorIteratorStep, iterator
        else
            return ipairs(iterable)
        end
    end
end

local __TS__ArrayFrom
do
    local function arrayLikeStep(self, index)
        index = index + 1
        if index > self.length then
            return
        end
        return index, self[index]
    end
    local function arrayLikeIterator(arr)
        if type(arr.length) == "number" then
            return arrayLikeStep, arr, 0
        end
        return __TS__Iterator(arr)
    end
    function __TS__ArrayFrom(arrayLike, mapFn, thisArg)
        local result = {}
        if mapFn == nil then
            for ____, v in arrayLikeIterator(arrayLike) do
                result[#result + 1] = v
            end
        else
            local i = 0
            for ____, v in arrayLikeIterator(arrayLike) do
                local ____mapFn_3 = mapFn
                local ____thisArg_1 = thisArg
                local ____v_2 = v
                local ____i_0 = i
                i = ____i_0 + 1
                result[#result + 1] = ____mapFn_3(____thisArg_1, ____v_2, ____i_0)
            end
        end
        return result
    end
end

local function __TS__ArrayIncludes(self, searchElement, fromIndex)
    if fromIndex == nil then
        fromIndex = 0
    end
    local len = #self
    local k = fromIndex
    if fromIndex < 0 then
        k = len + fromIndex
    end
    if k < 0 then
        k = 0
    end
    for i = k + 1, len do
        if self[i] == searchElement then
            return true
        end
    end
    return false
end

local function __TS__ArrayIndexOf(self, searchElement, fromIndex)
    if fromIndex == nil then
        fromIndex = 0
    end
    local len = #self
    if len == 0 then
        return -1
    end
    if fromIndex >= len then
        return -1
    end
    if fromIndex < 0 then
        fromIndex = len + fromIndex
        if fromIndex < 0 then
            fromIndex = 0
        end
    end
    for i = fromIndex + 1, len do
        if self[i] == searchElement then
            return i - 1
        end
    end
    return -1
end

local function __TS__ArrayJoin(self, separator)
    if separator == nil then
        separator = ","
    end
    local parts = {}
    for i = 1, #self do
        parts[i] = tostring(self[i])
    end
    return table.concat(parts, separator)
end

local function __TS__ArrayMap(self, callbackfn, thisArg)
    local result = {}
    for i = 1, #self do
        result[i] = callbackfn(thisArg, self[i], i - 1, self)
    end
    return result
end

local function __TS__ArrayPush(self, ...)
    local items = {...}
    local len = #self
    for i = 1, #items do
        len = len + 1
        self[len] = items[i]
    end
    return len
end

local function __TS__ArrayPushArray(self, items)
    local len = #self
    for i = 1, #items do
        len = len + 1
        self[len] = items[i]
    end
    return len
end

local function __TS__CountVarargs(...)
    return select("#", ...)
end

local function __TS__ArrayReduce(self, callbackFn, ...)
    local len = #self
    local k = 0
    local accumulator = nil
    if __TS__CountVarargs(...) ~= 0 then
        accumulator = ...
    elseif len > 0 then
        accumulator = self[1]
        k = 1
    else
        error("Reduce of empty array with no initial value", 0)
    end
    for i = k + 1, len do
        accumulator = callbackFn(
            nil,
            accumulator,
            self[i],
            i - 1,
            self
        )
    end
    return accumulator
end

local function __TS__ArrayReduceRight(self, callbackFn, ...)
    local len = #self
    local k = len - 1
    local accumulator = nil
    if __TS__CountVarargs(...) ~= 0 then
        accumulator = ...
    elseif len > 0 then
        accumulator = self[k + 1]
        k = k - 1
    else
        error("Reduce of empty array with no initial value", 0)
    end
    for i = k + 1, 1, -1 do
        accumulator = callbackFn(
            nil,
            accumulator,
            self[i],
            i - 1,
            self
        )
    end
    return accumulator
end

local function __TS__ArrayReverse(self)
    local i = 1
    local j = #self
    while i < j do
        local temp = self[j]
        self[j] = self[i]
        self[i] = temp
        i = i + 1
        j = j - 1
    end
    return self
end

local function __TS__ArrayUnshift(self, ...)
    local items = {...}
    local numItemsToInsert = #items
    if numItemsToInsert == 0 then
        return #self
    end
    for i = #self, 1, -1 do
        self[i + numItemsToInsert] = self[i]
    end
    for i = 1, numItemsToInsert do
        self[i] = items[i]
    end
    return #self
end

local function __TS__ArraySort(self, compareFn)
    if compareFn ~= nil then
        table.sort(
            self,
            function(a, b) return compareFn(nil, a, b) < 0 end
        )
    else
        table.sort(self)
    end
    return self
end

local function __TS__ArraySlice(self, first, last)
    local len = #self
    first = first or 0
    if first < 0 then
        first = len + first
        if first < 0 then
            first = 0
        end
    else
        if first > len then
            first = len
        end
    end
    last = last or len
    if last < 0 then
        last = len + last
        if last < 0 then
            last = 0
        end
    else
        if last > len then
            last = len
        end
    end
    local out = {}
    first = first + 1
    last = last + 1
    local n = 1
    while first < last do
        out[n] = self[first]
        first = first + 1
        n = n + 1
    end
    return out
end

local function __TS__ArraySome(self, callbackfn, thisArg)
    for i = 1, #self do
        if callbackfn(thisArg, self[i], i - 1, self) then
            return true
        end
    end
    return false
end

local function __TS__ArraySplice(self, ...)
    local args = {...}
    local len = #self
    local actualArgumentCount = __TS__CountVarargs(...)
    local start = args[1]
    local deleteCount = args[2]
    if start < 0 then
        start = len + start
        if start < 0 then
            start = 0
        end
    elseif start > len then
        start = len
    end
    local itemCount = actualArgumentCount - 2
    if itemCount < 0 then
        itemCount = 0
    end
    local actualDeleteCount
    if actualArgumentCount == 0 then
        actualDeleteCount = 0
    elseif actualArgumentCount == 1 then
        actualDeleteCount = len - start
    else
        actualDeleteCount = deleteCount or 0
        if actualDeleteCount < 0 then
            actualDeleteCount = 0
        end
        if actualDeleteCount > len - start then
            actualDeleteCount = len - start
        end
    end
    local out = {}
    for k = 1, actualDeleteCount do
        local from = start + k
        if self[from] ~= nil then
            out[k] = self[from]
        end
    end
    if itemCount < actualDeleteCount then
        for k = start + 1, len - actualDeleteCount do
            local from = k + actualDeleteCount
            local to = k + itemCount
            if self[from] then
                self[to] = self[from]
            else
                self[to] = nil
            end
        end
        for k = len - actualDeleteCount + itemCount + 1, len do
            self[k] = nil
        end
    elseif itemCount > actualDeleteCount then
        for k = len - actualDeleteCount, start + 1, -1 do
            local from = k + actualDeleteCount
            local to = k + itemCount
            if self[from] then
                self[to] = self[from]
            else
                self[to] = nil
            end
        end
    end
    local j = start + 1
    for i = 3, actualArgumentCount do
        self[j] = args[i]
        j = j + 1
    end
    for k = #self, len - actualDeleteCount + itemCount + 1, -1 do
        self[k] = nil
    end
    return out
end

local function __TS__ArrayToObject(self)
    local object = {}
    for i = 1, #self do
        object[i - 1] = self[i]
    end
    return object
end

local function __TS__ArrayFlat(self, depth)
    if depth == nil then
        depth = 1
    end
    local result = {}
    local len = 0
    for i = 1, #self do
        local value = self[i]
        if depth > 0 and __TS__ArrayIsArray(value) then
            local toAdd
            if depth == 1 then
                toAdd = value
            else
                toAdd = __TS__ArrayFlat(value, depth - 1)
            end
            for j = 1, #toAdd do
                local val = toAdd[j]
                len = len + 1
                result[len] = val
            end
        else
            len = len + 1
            result[len] = value
        end
    end
    return result
end

local function __TS__ArrayFlatMap(self, callback, thisArg)
    local result = {}
    local len = 0
    for i = 1, #self do
        local value = callback(thisArg, self[i], i - 1, self)
        if __TS__ArrayIsArray(value) then
            for j = 1, #value do
                len = len + 1
                result[len] = value[j]
            end
        else
            len = len + 1
            result[len] = value
        end
    end
    return result
end

local function __TS__ArraySetLength(self, length)
    if length < 0 or length ~= length or length == math.huge or math.floor(length) ~= length then
        error(
            "invalid array length: " .. tostring(length),
            0
        )
    end
    for i = length + 1, #self do
        self[i] = nil
    end
    return length
end

local __TS__Unpack = table.unpack or unpack

local function __TS__ArrayToReversed(self)
    local copy = {__TS__Unpack(self)}
    __TS__ArrayReverse(copy)
    return copy
end

local function __TS__ArrayToSorted(self, compareFn)
    local copy = {__TS__Unpack(self)}
    __TS__ArraySort(copy, compareFn)
    return copy
end

local function __TS__ArrayToSpliced(self, start, deleteCount, ...)
    local copy = {__TS__Unpack(self)}
    __TS__ArraySplice(copy, start, deleteCount, ...)
    return copy
end

local function __TS__ArrayWith(self, index, value)
    local copy = {__TS__Unpack(self)}
    copy[index + 1] = value
    return copy
end

local function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype)
    instance:____constructor(...)
    return instance
end

local function __TS__InstanceOf(obj, classTbl)
    if type(classTbl) ~= "table" then
        error("Right-hand side of 'instanceof' is not an object", 0)
    end
    if classTbl[Symbol.hasInstance] ~= nil then
        return not not classTbl[Symbol.hasInstance](classTbl, obj)
    end
    if type(obj) == "table" then
        local luaClass = obj.constructor
        while luaClass ~= nil do
            if luaClass == classTbl then
                return true
            end
            luaClass = luaClass.____super
        end
    end
    return false
end

local function __TS__Class(self)
    local c = {prototype = {}}
    c.prototype.__index = c.prototype
    c.prototype.constructor = c
    return c
end

local __TS__Promise
do
    local function makeDeferredPromiseFactory()
        local resolve
        local reject
        local function executor(____, res, rej)
            resolve = res
            reject = rej
        end
        return function()
            local promise = __TS__New(__TS__Promise, executor)
            return promise, resolve, reject
        end
    end
    local makeDeferredPromise = makeDeferredPromiseFactory()
    local function isPromiseLike(value)
        return __TS__InstanceOf(value, __TS__Promise)
    end
    local function doNothing(self)
    end
    local ____pcall = _G.pcall
    __TS__Promise = __TS__Class()
    __TS__Promise.name = "__TS__Promise"
    function __TS__Promise.prototype.____constructor(self, executor)
        self.state = 0
        self.fulfilledCallbacks = {}
        self.rejectedCallbacks = {}
        self.finallyCallbacks = {}
        local success, ____error = ____pcall(
            executor,
            nil,
            function(____, v) return self:resolve(v) end,
            function(____, err) return self:reject(err) end
        )
        if not success then
            self:reject(____error)
        end
    end
    function __TS__Promise.resolve(value)
        if __TS__InstanceOf(value, __TS__Promise) then
            return value
        end
        local promise = __TS__New(__TS__Promise, doNothing)
        promise.state = 1
        promise.value = value
        return promise
    end
    function __TS__Promise.reject(reason)
        local promise = __TS__New(__TS__Promise, doNothing)
        promise.state = 2
        promise.rejectionReason = reason
        return promise
    end
    __TS__Promise.prototype["then"] = function(self, onFulfilled, onRejected)
        local promise, resolve, reject = makeDeferredPromise()
        self:addCallbacks(
            onFulfilled and self:createPromiseResolvingCallback(onFulfilled, resolve, reject) or resolve,
            onRejected and self:createPromiseResolvingCallback(onRejected, resolve, reject) or reject
        )
        return promise
    end
    function __TS__Promise.prototype.addCallbacks(self, fulfilledCallback, rejectedCallback)
        if self.state == 1 then
            return fulfilledCallback(nil, self.value)
        end
        if self.state == 2 then
            return rejectedCallback(nil, self.rejectionReason)
        end
        local ____self_fulfilledCallbacks_0 = self.fulfilledCallbacks
        ____self_fulfilledCallbacks_0[#____self_fulfilledCallbacks_0 + 1] = fulfilledCallback
        local ____self_rejectedCallbacks_1 = self.rejectedCallbacks
        ____self_rejectedCallbacks_1[#____self_rejectedCallbacks_1 + 1] = rejectedCallback
    end
    function __TS__Promise.prototype.catch(self, onRejected)
        return self["then"](self, nil, onRejected)
    end
    function __TS__Promise.prototype.finally(self, onFinally)
        if onFinally then
            local ____self_finallyCallbacks_2 = self.finallyCallbacks
            ____self_finallyCallbacks_2[#____self_finallyCallbacks_2 + 1] = onFinally
            if self.state ~= 0 then
                onFinally(nil)
            end
        end
        return self
    end
    function __TS__Promise.prototype.resolve(self, value)
        if isPromiseLike(value) then
            return value:addCallbacks(
                function(____, v) return self:resolve(v) end,
                function(____, err) return self:reject(err) end
            )
        end
        if self.state == 0 then
            self.state = 1
            self.value = value
            return self:invokeCallbacks(self.fulfilledCallbacks, value)
        end
    end
    function __TS__Promise.prototype.reject(self, reason)
        if self.state == 0 then
            self.state = 2
            self.rejectionReason = reason
            return self:invokeCallbacks(self.rejectedCallbacks, reason)
        end
    end
    function __TS__Promise.prototype.invokeCallbacks(self, callbacks, value)
        local callbacksLength = #callbacks
        local finallyCallbacks = self.finallyCallbacks
        local finallyCallbacksLength = #finallyCallbacks
        if callbacksLength ~= 0 then
            for i = 1, callbacksLength - 1 do
                callbacks[i](callbacks, value)
            end
            if finallyCallbacksLength == 0 then
                return callbacks[callbacksLength](callbacks, value)
            end
            callbacks[callbacksLength](callbacks, value)
        end
        if finallyCallbacksLength ~= 0 then
            for i = 1, finallyCallbacksLength - 1 do
                finallyCallbacks[i](finallyCallbacks)
            end
            return finallyCallbacks[finallyCallbacksLength](finallyCallbacks)
        end
    end
    function __TS__Promise.prototype.createPromiseResolvingCallback(self, f, resolve, reject)
        return function(____, value)
            local success, resultOrError = ____pcall(f, nil, value)
            if not success then
                return reject(nil, resultOrError)
            end
            return self:handleCallbackValue(resultOrError, resolve, reject)
        end
    end
    function __TS__Promise.prototype.handleCallbackValue(self, value, resolve, reject)
        if isPromiseLike(value) then
            local nextpromise = value
            if nextpromise.state == 1 then
                return resolve(nil, nextpromise.value)
            elseif nextpromise.state == 2 then
                return reject(nil, nextpromise.rejectionReason)
            else
                return nextpromise:addCallbacks(resolve, reject)
            end
        else
            return resolve(nil, value)
        end
    end
end

local __TS__AsyncAwaiter, __TS__Await
do
    local ____coroutine = _G.coroutine or ({})
    local cocreate = ____coroutine.create
    local coresume = ____coroutine.resume
    local costatus = ____coroutine.status
    local coyield = ____coroutine.yield
    function __TS__AsyncAwaiter(generator)
        return __TS__New(
            __TS__Promise,
            function(____, resolve, reject)
                local fulfilled, step, resolved, asyncCoroutine
                function fulfilled(self, value)
                    local success, resultOrError = coresume(asyncCoroutine, value)
                    if success then
                        return step(resultOrError)
                    end
                    return reject(nil, resultOrError)
                end
                function step(result)
                    if resolved then
                        return
                    end
                    if costatus(asyncCoroutine) == "dead" then
                        return resolve(nil, result)
                    end
                    return __TS__Promise.resolve(result):addCallbacks(fulfilled, reject)
                end
                resolved = false
                asyncCoroutine = cocreate(generator)
                local success, resultOrError = coresume(
                    asyncCoroutine,
                    function(____, v)
                        resolved = true
                        return __TS__Promise.resolve(v):addCallbacks(resolve, reject)
                    end
                )
                if success then
                    return step(resultOrError)
                else
                    return reject(nil, resultOrError)
                end
            end
        )
    end
    function __TS__Await(thing)
        return coyield(thing)
    end
end

local function __TS__ClassExtends(target, base)
    target.____super = base
    local staticMetatable = setmetatable({__index = base}, base)
    setmetatable(target, staticMetatable)
    local baseMetatable = getmetatable(base)
    if baseMetatable then
        if type(baseMetatable.__index) == "function" then
            staticMetatable.__index = baseMetatable.__index
        end
        if type(baseMetatable.__newindex) == "function" then
            staticMetatable.__newindex = baseMetatable.__newindex
        end
    end
    setmetatable(target.prototype, base.prototype)
    if type(base.prototype.__index) == "function" then
        target.prototype.__index = base.prototype.__index
    end
    if type(base.prototype.__newindex) == "function" then
        target.prototype.__newindex = base.prototype.__newindex
    end
    if type(base.prototype.__tostring) == "function" then
        target.prototype.__tostring = base.prototype.__tostring
    end
end

local function __TS__CloneDescriptor(____bindingPattern0)
    local value
    local writable
    local set
    local get
    local configurable
    local enumerable
    enumerable = ____bindingPattern0.enumerable
    configurable = ____bindingPattern0.configurable
    get = ____bindingPattern0.get
    set = ____bindingPattern0.set
    writable = ____bindingPattern0.writable
    value = ____bindingPattern0.value
    local descriptor = {enumerable = enumerable == true, configurable = configurable == true}
    local hasGetterOrSetter = get ~= nil or set ~= nil
    local hasValueOrWritableAttribute = writable ~= nil or value ~= nil
    if hasGetterOrSetter and hasValueOrWritableAttribute then
        error("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute.", 0)
    end
    if get or set then
        descriptor.get = get
        descriptor.set = set
    else
        descriptor.value = value
        descriptor.writable = writable == true
    end
    return descriptor
end

local function __TS__Decorate(self, originalValue, decorators, context)
    local result = originalValue
    do
        local i = #decorators
        while i >= 0 do
            local decorator = decorators[i + 1]
            if decorator ~= nil then
                local ____decorator_result_0 = decorator(self, result, context)
                if ____decorator_result_0 == nil then
                    ____decorator_result_0 = result
                end
                result = ____decorator_result_0
            end
            i = i - 1
        end
    end
    return result
end

local function __TS__ObjectAssign(target, ...)
    local sources = {...}
    for i = 1, #sources do
        local source = sources[i]
        for key in pairs(source) do
            target[key] = source[key]
        end
    end
    return target
end

local function __TS__ObjectGetOwnPropertyDescriptor(object, key)
    local metatable = getmetatable(object)
    if not metatable then
        return
    end
    if not rawget(metatable, "_descriptors") then
        return
    end
    return rawget(metatable, "_descriptors")[key]
end

local __TS__DescriptorGet
do
    local getmetatable = _G.getmetatable
    local ____rawget = _G.rawget
    function __TS__DescriptorGet(self, metatable, key)
        while metatable do
            local rawResult = ____rawget(metatable, key)
            if rawResult ~= nil then
                return rawResult
            end
            local descriptors = ____rawget(metatable, "_descriptors")
            if descriptors then
                local descriptor = descriptors[key]
                if descriptor ~= nil then
                    if descriptor.get then
                        return descriptor.get(self)
                    end
                    return descriptor.value
                end
            end
            metatable = getmetatable(metatable)
        end
    end
end

local __TS__DescriptorSet
do
    local getmetatable = _G.getmetatable
    local ____rawget = _G.rawget
    local rawset = _G.rawset
    function __TS__DescriptorSet(self, metatable, key, value)
        while metatable do
            local descriptors = ____rawget(metatable, "_descriptors")
            if descriptors then
                local descriptor = descriptors[key]
                if descriptor ~= nil then
                    if descriptor.set then
                        descriptor.set(self, value)
                    else
                        if descriptor.writable == false then
                            error(
                                ((("Cannot assign to read only property '" .. key) .. "' of object '") .. tostring(self)) .. "'",
                                0
                            )
                        end
                        descriptor.value = value
                    end
                    return
                end
            end
            metatable = getmetatable(metatable)
        end
        rawset(self, key, value)
    end
end

local __TS__SetDescriptor
do
    local getmetatable = _G.getmetatable
    local function descriptorIndex(self, key)
        return __TS__DescriptorGet(
            self,
            getmetatable(self),
            key
        )
    end
    local function descriptorNewIndex(self, key, value)
        return __TS__DescriptorSet(
            self,
            getmetatable(self),
            key,
            value
        )
    end
    function __TS__SetDescriptor(target, key, desc, isPrototype)
        if isPrototype == nil then
            isPrototype = false
        end
        local ____isPrototype_0
        if isPrototype then
            ____isPrototype_0 = target
        else
            ____isPrototype_0 = getmetatable(target)
        end
        local metatable = ____isPrototype_0
        if not metatable then
            metatable = {}
            setmetatable(target, metatable)
        end
        local value = rawget(target, key)
        if value ~= nil then
            rawset(target, key, nil)
        end
        if not rawget(metatable, "_descriptors") then
            metatable._descriptors = {}
        end
        metatable._descriptors[key] = __TS__CloneDescriptor(desc)
        metatable.__index = descriptorIndex
        metatable.__newindex = descriptorNewIndex
    end
end

local function __TS__DecorateLegacy(decorators, target, key, desc)
    local result = target
    do
        local i = #decorators
        while i >= 0 do
            local decorator = decorators[i + 1]
            if decorator ~= nil then
                local oldResult = result
                if key == nil then
                    result = decorator(nil, result)
                elseif desc == true then
                    local value = rawget(target, key)
                    local descriptor = __TS__ObjectGetOwnPropertyDescriptor(target, key) or ({configurable = true, writable = true, value = value})
                    local desc = decorator(nil, target, key, descriptor) or descriptor
                    local isSimpleValue = desc.configurable == true and desc.writable == true and not desc.get and not desc.set
                    if isSimpleValue then
                        rawset(target, key, desc.value)
                    else
                        __TS__SetDescriptor(
                            target,
                            key,
                            __TS__ObjectAssign({}, descriptor, desc)
                        )
                    end
                elseif desc == false then
                    result = decorator(nil, target, key, desc)
                else
                    result = decorator(nil, target, key)
                end
                result = result or oldResult
            end
            i = i - 1
        end
    end
    return result
end

local function __TS__DecorateParam(paramIndex, decorator)
    return function(____, target, key) return decorator(nil, target, key, paramIndex) end
end

local function __TS__StringIncludes(self, searchString, position)
    if not position then
        position = 1
    else
        position = position + 1
    end
    local index = string.find(self, searchString, position, true)
    return index ~= nil
end

local Error, RangeError, ReferenceError, SyntaxError, TypeError, URIError
do
    local function getErrorStack(self, constructor)
        if debug == nil then
            return nil
        end
        local level = 1
        while true do
            local info = debug.getinfo(level, "f")
            level = level + 1
            if not info then
                level = 1
                break
            elseif info.func == constructor then
                break
            end
        end
        if __TS__StringIncludes(_VERSION, "Lua 5.0") then
            return debug.traceback(("[Level " .. tostring(level)) .. "]")
        elseif _VERSION == "Lua 5.1" then
            return string.sub(
                debug.traceback("", level),
                2
            )
        else
            return debug.traceback(nil, level)
        end
    end
    local function wrapErrorToString(self, getDescription)
        return function(self)
            local description = getDescription(self)
            local caller = debug.getinfo(3, "f")
            local isClassicLua = __TS__StringIncludes(_VERSION, "Lua 5.0")
            if isClassicLua or caller and caller.func ~= error then
                return description
            else
                return (description .. "\n") .. tostring(self.stack)
            end
        end
    end
    local function initErrorClass(self, Type, name)
        Type.name = name
        return setmetatable(
            Type,
            {__call = function(____, _self, message) return __TS__New(Type, message) end}
        )
    end
    local ____initErrorClass_1 = initErrorClass
    local ____class_0 = __TS__Class()
    ____class_0.name = ""
    function ____class_0.prototype.____constructor(self, message)
        if message == nil then
            message = ""
        end
        self.message = message
        self.name = "Error"
        self.stack = getErrorStack(nil, __TS__New)
        local metatable = getmetatable(self)
        if metatable and not metatable.__errorToStringPatched then
            metatable.__errorToStringPatched = true
            metatable.__tostring = wrapErrorToString(nil, metatable.__tostring)
        end
    end
    function ____class_0.prototype.__tostring(self)
        return self.message ~= "" and (self.name .. ": ") .. self.message or self.name
    end
    Error = ____initErrorClass_1(nil, ____class_0, "Error")
    local function createErrorClass(self, name)
        local ____initErrorClass_3 = initErrorClass
        local ____class_2 = __TS__Class()
        ____class_2.name = ____class_2.name
        __TS__ClassExtends(____class_2, Error)
        function ____class_2.prototype.____constructor(self, ...)
            ____class_2.____super.prototype.____constructor(self, ...)
            self.name = name
        end
        return ____initErrorClass_3(nil, ____class_2, name)
    end
    RangeError = createErrorClass(nil, "RangeError")
    ReferenceError = createErrorClass(nil, "ReferenceError")
    SyntaxError = createErrorClass(nil, "SyntaxError")
    TypeError = createErrorClass(nil, "TypeError")
    URIError = createErrorClass(nil, "URIError")
end

local function __TS__ObjectGetOwnPropertyDescriptors(object)
    local metatable = getmetatable(object)
    if not metatable then
        return {}
    end
    return rawget(metatable, "_descriptors") or ({})
end

local function __TS__Delete(target, key)
    local descriptors = __TS__ObjectGetOwnPropertyDescriptors(target)
    local descriptor = descriptors[key]
    if descriptor then
        if not descriptor.configurable then
            error(
                __TS__New(
                    TypeError,
                    ((("Cannot delete property " .. tostring(key)) .. " of ") .. tostring(target)) .. "."
                ),
                0
            )
        end
        descriptors[key] = nil
        return true
    end
    target[key] = nil
    return true
end

local function __TS__StringAccess(self, index)
    if index >= 0 and index < #self then
        return string.sub(self, index + 1, index + 1)
    end
end

local function __TS__DelegatedYield(iterable)
    if type(iterable) == "string" then
        for index = 0, #iterable - 1 do
            coroutine.yield(__TS__StringAccess(iterable, index))
        end
    elseif iterable.____coroutine ~= nil then
        local co = iterable.____coroutine
        while true do
            local status, value = coroutine.resume(co)
            if not status then
                error(value, 0)
            end
            if coroutine.status(co) == "dead" then
                return value
            else
                coroutine.yield(value)
            end
        end
    elseif iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        while true do
            local result = iterator:next()
            if result.done then
                return result.value
            else
                coroutine.yield(result.value)
            end
        end
    else
        for ____, value in ipairs(iterable) do
            coroutine.yield(value)
        end
    end
end

local function __TS__FunctionBind(fn, ...)
    local boundArgs = {...}
    return function(____, ...)
        local args = {...}
        __TS__ArrayUnshift(
            args,
            __TS__Unpack(boundArgs)
        )
        return fn(__TS__Unpack(args))
    end
end

local __TS__Generator
do
    local function generatorIterator(self)
        return self
    end
    local function generatorNext(self, ...)
        local co = self.____coroutine
        if coroutine.status(co) == "dead" then
            return {done = true}
        end
        local status, value = coroutine.resume(co, ...)
        if not status then
            error(value, 0)
        end
        return {
            value = value,
            done = coroutine.status(co) == "dead"
        }
    end
    function __TS__Generator(fn)
        return function(...)
            local args = {...}
            local argsLength = __TS__CountVarargs(...)
            return {
                ____coroutine = coroutine.create(function() return fn(__TS__Unpack(args, 1, argsLength)) end),
                [Symbol.iterator] = generatorIterator,
                next = generatorNext
            }
        end
    end
end

local function __TS__InstanceOfObject(value)
    local valueType = type(value)
    return valueType == "table" or valueType == "function"
end

local function __TS__LuaIteratorSpread(self, state, firstKey)
    local results = {}
    local key, value = self(state, firstKey)
    while key do
        results[#results + 1] = {key, value}
        key, value = self(state, key)
    end
    return __TS__Unpack(results)
end

local Map
do
    Map = __TS__Class()
    Map.name = "Map"
    function Map.prototype.____constructor(self, entries)
        self[Symbol.toStringTag] = "Map"
        self.items = {}
        self.size = 0
        self.nextKey = {}
        self.previousKey = {}
        if entries == nil then
            return
        end
        local iterable = entries
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                local value = result.value
                self:set(value[1], value[2])
            end
        else
            local array = entries
            for ____, kvp in ipairs(array) do
                self:set(kvp[1], kvp[2])
            end
        end
    end
    function Map.prototype.clear(self)
        self.items = {}
        self.nextKey = {}
        self.previousKey = {}
        self.firstKey = nil
        self.lastKey = nil
        self.size = 0
    end
    function Map.prototype.delete(self, key)
        local contains = self:has(key)
        if contains then
            self.size = self.size - 1
            local next = self.nextKey[key]
            local previous = self.previousKey[key]
            if next ~= nil and previous ~= nil then
                self.nextKey[previous] = next
                self.previousKey[next] = previous
            elseif next ~= nil then
                self.firstKey = next
                self.previousKey[next] = nil
            elseif previous ~= nil then
                self.lastKey = previous
                self.nextKey[previous] = nil
            else
                self.firstKey = nil
                self.lastKey = nil
            end
            self.nextKey[key] = nil
            self.previousKey[key] = nil
        end
        self.items[key] = nil
        return contains
    end
    function Map.prototype.forEach(self, callback)
        for ____, key in __TS__Iterator(self:keys()) do
            callback(nil, self.items[key], key, self)
        end
    end
    function Map.prototype.get(self, key)
        return self.items[key]
    end
    function Map.prototype.has(self, key)
        return self.nextKey[key] ~= nil or self.lastKey == key
    end
    function Map.prototype.set(self, key, value)
        local isNewValue = not self:has(key)
        if isNewValue then
            self.size = self.size + 1
        end
        self.items[key] = value
        if self.firstKey == nil then
            self.firstKey = key
            self.lastKey = key
        elseif isNewValue then
            self.nextKey[self.lastKey] = key
            self.previousKey[key] = self.lastKey
            self.lastKey = key
        end
        return self
    end
    Map.prototype[Symbol.iterator] = function(self)
        return self:entries()
    end
    function Map.prototype.entries(self)
        local items = self.items
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = {key, items[key]}}
                key = nextKey[key]
                return result
            end
        }
    end
    function Map.prototype.keys(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Map.prototype.values(self)
        local items = self.items
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = items[key]}
                key = nextKey[key]
                return result
            end
        }
    end
    Map[Symbol.species] = Map
end

local function __TS__MapGroupBy(items, keySelector)
    local result = __TS__New(Map)
    local i = 0
    for ____, item in __TS__Iterator(items) do
        local key = keySelector(nil, item, i)
        if result:has(key) then
            local ____temp_0 = result:get(key)
            ____temp_0[#____temp_0 + 1] = item
        else
            result:set(key, {item})
        end
        i = i + 1
    end
    return result
end

local __TS__Match = string.match

local __TS__MathAtan2 = math.atan2 or math.atan

local __TS__MathModf = math.modf

local function __TS__NumberIsNaN(value)
    return value ~= value
end

local function __TS__MathSign(val)
    if __TS__NumberIsNaN(val) or val == 0 then
        return val
    end
    if val < 0 then
        return -1
    end
    return 1
end

local function __TS__NumberIsFinite(value)
    return type(value) == "number" and value == value and value ~= math.huge and value ~= -math.huge
end

local function __TS__MathTrunc(val)
    if not __TS__NumberIsFinite(val) or val == 0 then
        return val
    end
    return val > 0 and math.floor(val) or math.ceil(val)
end

local function __TS__Number(value)
    local valueType = type(value)
    if valueType == "number" then
        return value
    elseif valueType == "string" then
        local numberValue = tonumber(value)
        if numberValue then
            return numberValue
        end
        if value == "Infinity" then
            return math.huge
        end
        if value == "-Infinity" then
            return -math.huge
        end
        local stringWithoutSpaces = string.gsub(value, "%s", "")
        if stringWithoutSpaces == "" then
            return 0
        end
        return 0 / 0
    elseif valueType == "boolean" then
        return value and 1 or 0
    else
        return 0 / 0
    end
end

local function __TS__NumberIsInteger(value)
    return __TS__NumberIsFinite(value) and math.floor(value) == value
end

local function __TS__StringSubstring(self, start, ____end)
    if ____end ~= ____end then
        ____end = 0
    end
    if ____end ~= nil and start > ____end then
        start, ____end = ____end, start
    end
    if start >= 0 then
        start = start + 1
    else
        start = 1
    end
    if ____end ~= nil and ____end < 0 then
        ____end = 0
    end
    return string.sub(self, start, ____end)
end

local __TS__ParseInt
do
    local parseIntBasePattern = "0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTvVwWxXyYzZ"
    function __TS__ParseInt(numberString, base)
        if base == nil then
            base = 10
            local hexMatch = __TS__Match(numberString, "^%s*-?0[xX]")
            if hexMatch ~= nil then
                base = 16
                numberString = (__TS__Match(hexMatch, "-")) and "-" .. __TS__StringSubstring(numberString, #hexMatch) or __TS__StringSubstring(numberString, #hexMatch)
            end
        end
        if base < 2 or base > 36 then
            return 0 / 0
        end
        local allowedDigits = base <= 10 and __TS__StringSubstring(parseIntBasePattern, 0, base) or __TS__StringSubstring(parseIntBasePattern, 0, 10 + 2 * (base - 10))
        local pattern = ("^%s*(-?[" .. allowedDigits) .. "]*)"
        local number = tonumber((__TS__Match(numberString, pattern)), base)
        if number == nil then
            return 0 / 0
        end
        if number >= 0 then
            return math.floor(number)
        else
            return math.ceil(number)
        end
    end
end

local function __TS__ParseFloat(numberString)
    local infinityMatch = __TS__Match(numberString, "^%s*(-?Infinity)")
    if infinityMatch ~= nil then
        return __TS__StringAccess(infinityMatch, 0) == "-" and -math.huge or math.huge
    end
    local number = tonumber((__TS__Match(numberString, "^%s*(-?%d+%.?%d*)")))
    return number or 0 / 0
end

local __TS__NumberToString
do
    local radixChars = "0123456789abcdefghijklmnopqrstuvwxyz"
    function __TS__NumberToString(self, radix)
        if radix == nil or radix == 10 or self == math.huge or self == -math.huge or self ~= self then
            return tostring(self)
        end
        radix = math.floor(radix)
        if radix < 2 or radix > 36 then
            error("toString() radix argument must be between 2 and 36", 0)
        end
        local integer, fraction = __TS__MathModf(math.abs(self))
        local result = ""
        if radix == 8 then
            result = string.format("%o", integer)
        elseif radix == 16 then
            result = string.format("%x", integer)
        else
            repeat
                do
                    result = __TS__StringAccess(radixChars, integer % radix) .. result
                    integer = math.floor(integer / radix)
                end
            until not (integer ~= 0)
        end
        if fraction ~= 0 then
            result = result .. "."
            local delta = 1e-16
            repeat
                do
                    fraction = fraction * radix
                    delta = delta * radix
                    local digit = math.floor(fraction)
                    result = result .. __TS__StringAccess(radixChars, digit)
                    fraction = fraction - digit
                end
            until not (fraction >= delta)
        end
        if self < 0 then
            result = "-" .. result
        end
        return result
    end
end

local function __TS__NumberToFixed(self, fractionDigits)
    if math.abs(self) >= 1e+21 or self ~= self then
        return tostring(self)
    end
    local f = math.floor(fractionDigits or 0)
    if f < 0 or f > 99 then
        error("toFixed() digits argument must be between 0 and 99", 0)
    end
    return string.format(
        ("%." .. tostring(f)) .. "f",
        self
    )
end

local function __TS__ObjectDefineProperty(target, key, desc)
    local luaKey = type(key) == "number" and key + 1 or key
    local value = rawget(target, luaKey)
    local hasGetterOrSetter = desc.get ~= nil or desc.set ~= nil
    local descriptor
    if hasGetterOrSetter then
        if value ~= nil then
            error(
                "Cannot redefine property: " .. tostring(key),
                0
            )
        end
        descriptor = desc
    else
        local valueExists = value ~= nil
        local ____desc_set_4 = desc.set
        local ____desc_get_5 = desc.get
        local ____desc_configurable_0 = desc.configurable
        if ____desc_configurable_0 == nil then
            ____desc_configurable_0 = valueExists
        end
        local ____desc_enumerable_1 = desc.enumerable
        if ____desc_enumerable_1 == nil then
            ____desc_enumerable_1 = valueExists
        end
        local ____desc_writable_2 = desc.writable
        if ____desc_writable_2 == nil then
            ____desc_writable_2 = valueExists
        end
        local ____temp_3
        if desc.value ~= nil then
            ____temp_3 = desc.value
        else
            ____temp_3 = value
        end
        descriptor = {
            set = ____desc_set_4,
            get = ____desc_get_5,
            configurable = ____desc_configurable_0,
            enumerable = ____desc_enumerable_1,
            writable = ____desc_writable_2,
            value = ____temp_3
        }
    end
    __TS__SetDescriptor(target, luaKey, descriptor)
    return target
end

local function __TS__ObjectEntries(obj)
    local result = {}
    local len = 0
    for key in pairs(obj) do
        len = len + 1
        result[len] = {key, obj[key]}
    end
    return result
end

local function __TS__ObjectFromEntries(entries)
    local obj = {}
    local iterable = entries
    if iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        while true do
            local result = iterator:next()
            if result.done then
                break
            end
            local value = result.value
            obj[value[1]] = value[2]
        end
    else
        for ____, entry in ipairs(entries) do
            obj[entry[1]] = entry[2]
        end
    end
    return obj
end

local function __TS__ObjectGroupBy(items, keySelector)
    local result = {}
    local i = 0
    for ____, item in __TS__Iterator(items) do
        local key = keySelector(nil, item, i)
        if result[key] ~= nil then
            local ____result_key_0 = result[key]
            ____result_key_0[#____result_key_0 + 1] = item
        else
            result[key] = {item}
        end
        i = i + 1
    end
    return result
end

local function __TS__ObjectKeys(obj)
    local result = {}
    local len = 0
    for key in pairs(obj) do
        len = len + 1
        result[len] = key
    end
    return result
end

local function __TS__ObjectRest(target, usedProperties)
    local result = {}
    for property in pairs(target) do
        if not usedProperties[property] then
            result[property] = target[property]
        end
    end
    return result
end

local function __TS__ObjectValues(obj)
    local result = {}
    local len = 0
    for key in pairs(obj) do
        len = len + 1
        result[len] = obj[key]
    end
    return result
end

local function __TS__PromiseAll(iterable)
    local results = {}
    local toResolve = {}
    local numToResolve = 0
    local i = 0
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == 1 then
                results[i + 1] = item.value
            elseif item.state == 2 then
                return __TS__Promise.reject(item.rejectionReason)
            else
                numToResolve = numToResolve + 1
                toResolve[i] = item
            end
        else
            results[i + 1] = item
        end
        i = i + 1
    end
    if numToResolve == 0 then
        return __TS__Promise.resolve(results)
    end
    return __TS__New(
        __TS__Promise,
        function(____, resolve, reject)
            for index, promise in pairs(toResolve) do
                promise["then"](
                    promise,
                    function(____, data)
                        results[index + 1] = data
                        numToResolve = numToResolve - 1
                        if numToResolve == 0 then
                            resolve(nil, results)
                        end
                    end,
                    function(____, reason)
                        reject(nil, reason)
                    end
                )
            end
        end
    )
end

local function __TS__PromiseAllSettled(iterable)
    local results = {}
    local toResolve = {}
    local numToResolve = 0
    local i = 0
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == 1 then
                results[i + 1] = {status = "fulfilled", value = item.value}
            elseif item.state == 2 then
                results[i + 1] = {status = "rejected", reason = item.rejectionReason}
            else
                numToResolve = numToResolve + 1
                toResolve[i] = item
            end
        else
            results[i + 1] = {status = "fulfilled", value = item}
        end
        i = i + 1
    end
    if numToResolve == 0 then
        return __TS__Promise.resolve(results)
    end
    return __TS__New(
        __TS__Promise,
        function(____, resolve)
            for index, promise in pairs(toResolve) do
                promise["then"](
                    promise,
                    function(____, data)
                        results[index + 1] = {status = "fulfilled", value = data}
                        numToResolve = numToResolve - 1
                        if numToResolve == 0 then
                            resolve(nil, results)
                        end
                    end,
                    function(____, reason)
                        results[index + 1] = {status = "rejected", reason = reason}
                        numToResolve = numToResolve - 1
                        if numToResolve == 0 then
                            resolve(nil, results)
                        end
                    end
                )
            end
        end
    )
end

local function __TS__PromiseAny(iterable)
    local rejections = {}
    local pending = {}
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == 1 then
                return __TS__Promise.resolve(item.value)
            elseif item.state == 2 then
                rejections[#rejections + 1] = item.rejectionReason
            else
                pending[#pending + 1] = item
            end
        else
            return __TS__Promise.resolve(item)
        end
    end
    if #pending == 0 then
        return __TS__Promise.reject("No promises to resolve with .any()")
    end
    local numResolved = 0
    return __TS__New(
        __TS__Promise,
        function(____, resolve, reject)
            for ____, promise in ipairs(pending) do
                promise["then"](
                    promise,
                    function(____, data)
                        resolve(nil, data)
                    end,
                    function(____, reason)
                        rejections[#rejections + 1] = reason
                        numResolved = numResolved + 1
                        if numResolved == #pending then
                            reject(nil, {name = "AggregateError", message = "All Promises rejected", errors = rejections})
                        end
                    end
                )
            end
        end
    )
end

local function __TS__PromiseRace(iterable)
    local pending = {}
    for ____, item in __TS__Iterator(iterable) do
        if __TS__InstanceOf(item, __TS__Promise) then
            if item.state == 1 then
                return __TS__Promise.resolve(item.value)
            elseif item.state == 2 then
                return __TS__Promise.reject(item.rejectionReason)
            else
                pending[#pending + 1] = item
            end
        else
            return __TS__Promise.resolve(item)
        end
    end
    return __TS__New(
        __TS__Promise,
        function(____, resolve, reject)
            for ____, promise in ipairs(pending) do
                promise["then"](
                    promise,
                    function(____, value) return resolve(nil, value) end,
                    function(____, reason) return reject(nil, reason) end
                )
            end
        end
    )
end

local Set
do
    Set = __TS__Class()
    Set.name = "Set"
    function Set.prototype.____constructor(self, values)
        self[Symbol.toStringTag] = "Set"
        self.size = 0
        self.nextKey = {}
        self.previousKey = {}
        if values == nil then
            return
        end
        local iterable = values
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                self:add(result.value)
            end
        else
            local array = values
            for ____, value in ipairs(array) do
                self:add(value)
            end
        end
    end
    function Set.prototype.add(self, value)
        local isNewValue = not self:has(value)
        if isNewValue then
            self.size = self.size + 1
        end
        if self.firstKey == nil then
            self.firstKey = value
            self.lastKey = value
        elseif isNewValue then
            self.nextKey[self.lastKey] = value
            self.previousKey[value] = self.lastKey
            self.lastKey = value
        end
        return self
    end
    function Set.prototype.clear(self)
        self.nextKey = {}
        self.previousKey = {}
        self.firstKey = nil
        self.lastKey = nil
        self.size = 0
    end
    function Set.prototype.delete(self, value)
        local contains = self:has(value)
        if contains then
            self.size = self.size - 1
            local next = self.nextKey[value]
            local previous = self.previousKey[value]
            if next ~= nil and previous ~= nil then
                self.nextKey[previous] = next
                self.previousKey[next] = previous
            elseif next ~= nil then
                self.firstKey = next
                self.previousKey[next] = nil
            elseif previous ~= nil then
                self.lastKey = previous
                self.nextKey[previous] = nil
            else
                self.firstKey = nil
                self.lastKey = nil
            end
            self.nextKey[value] = nil
            self.previousKey[value] = nil
        end
        return contains
    end
    function Set.prototype.forEach(self, callback)
        for ____, key in __TS__Iterator(self:keys()) do
            callback(nil, key, key, self)
        end
    end
    function Set.prototype.has(self, value)
        return self.nextKey[value] ~= nil or self.lastKey == value
    end
    Set.prototype[Symbol.iterator] = function(self)
        return self:values()
    end
    function Set.prototype.entries(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = {key, key}}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.keys(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.values(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.union(self, other)
        local result = __TS__New(Set, self)
        for ____, item in __TS__Iterator(other) do
            result:add(item)
        end
        return result
    end
    function Set.prototype.intersection(self, other)
        local result = __TS__New(Set)
        for ____, item in __TS__Iterator(self) do
            if other:has(item) then
                result:add(item)
            end
        end
        return result
    end
    function Set.prototype.difference(self, other)
        local result = __TS__New(Set, self)
        for ____, item in __TS__Iterator(other) do
            result:delete(item)
        end
        return result
    end
    function Set.prototype.symmetricDifference(self, other)
        local result = __TS__New(Set, self)
        for ____, item in __TS__Iterator(other) do
            if self:has(item) then
                result:delete(item)
            else
                result:add(item)
            end
        end
        return result
    end
    function Set.prototype.isSubsetOf(self, other)
        for ____, item in __TS__Iterator(self) do
            if not other:has(item) then
                return false
            end
        end
        return true
    end
    function Set.prototype.isSupersetOf(self, other)
        for ____, item in __TS__Iterator(other) do
            if not self:has(item) then
                return false
            end
        end
        return true
    end
    function Set.prototype.isDisjointFrom(self, other)
        for ____, item in __TS__Iterator(self) do
            if other:has(item) then
                return false
            end
        end
        return true
    end
    Set[Symbol.species] = Set
end

local function __TS__SparseArrayNew(...)
    local sparseArray = {...}
    sparseArray.sparseLength = __TS__CountVarargs(...)
    return sparseArray
end

local function __TS__SparseArrayPush(sparseArray, ...)
    local args = {...}
    local argsLen = __TS__CountVarargs(...)
    local listLen = sparseArray.sparseLength
    for i = 1, argsLen do
        sparseArray[listLen + i] = args[i]
    end
    sparseArray.sparseLength = listLen + argsLen
end

local function __TS__SparseArraySpread(sparseArray)
    local _unpack = unpack or table.unpack
    return _unpack(sparseArray, 1, sparseArray.sparseLength)
end

local WeakMap
do
    WeakMap = __TS__Class()
    WeakMap.name = "WeakMap"
    function WeakMap.prototype.____constructor(self, entries)
        self[Symbol.toStringTag] = "WeakMap"
        self.items = {}
        setmetatable(self.items, {__mode = "k"})
        if entries == nil then
            return
        end
        local iterable = entries
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                local value = result.value
                self.items[value[1]] = value[2]
            end
        else
            for ____, kvp in ipairs(entries) do
                self.items[kvp[1]] = kvp[2]
            end
        end
    end
    function WeakMap.prototype.delete(self, key)
        local contains = self:has(key)
        self.items[key] = nil
        return contains
    end
    function WeakMap.prototype.get(self, key)
        return self.items[key]
    end
    function WeakMap.prototype.has(self, key)
        return self.items[key] ~= nil
    end
    function WeakMap.prototype.set(self, key, value)
        self.items[key] = value
        return self
    end
    WeakMap[Symbol.species] = WeakMap
end

local WeakSet
do
    WeakSet = __TS__Class()
    WeakSet.name = "WeakSet"
    function WeakSet.prototype.____constructor(self, values)
        self[Symbol.toStringTag] = "WeakSet"
        self.items = {}
        setmetatable(self.items, {__mode = "k"})
        if values == nil then
            return
        end
        local iterable = values
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                self.items[result.value] = true
            end
        else
            for ____, value in ipairs(values) do
                self.items[value] = true
            end
        end
    end
    function WeakSet.prototype.add(self, value)
        self.items[value] = true
        return self
    end
    function WeakSet.prototype.delete(self, value)
        local contains = self:has(value)
        self.items[value] = nil
        return contains
    end
    function WeakSet.prototype.has(self, value)
        return self.items[value] == true
    end
    WeakSet[Symbol.species] = WeakSet
end

local function __TS__SourceMapTraceBack(fileName, sourceMap)
    _G.__TS__sourcemap = _G.__TS__sourcemap or ({})
    _G.__TS__sourcemap[fileName] = sourceMap
    if _G.__TS__originalTraceback == nil then
        local originalTraceback = debug.traceback
        _G.__TS__originalTraceback = originalTraceback
        debug.traceback = function(thread, message, level)
            local trace
            if thread == nil and message == nil and level == nil then
                trace = originalTraceback()
            elseif __TS__StringIncludes(_VERSION, "Lua 5.0") then
                trace = originalTraceback((("[Level " .. tostring(level)) .. "] ") .. tostring(message))
            else
                trace = originalTraceback(thread, message, level)
            end
            if type(trace) ~= "string" then
                return trace
            end
            local function replacer(____, file, srcFile, line)
                local fileSourceMap = _G.__TS__sourcemap[file]
                if fileSourceMap ~= nil and fileSourceMap[line] ~= nil then
                    local data = fileSourceMap[line]
                    if type(data) == "number" then
                        return (srcFile .. ":") .. tostring(data)
                    end
                    return (data.file .. ":") .. tostring(data.line)
                end
                return (file .. ":") .. line
            end
            local result = string.gsub(
                trace,
                "(%S+)%.lua:(%d+)",
                function(file, line) return replacer(nil, file .. ".lua", file .. ".ts", line) end
            )
            local function stringReplacer(____, file, line)
                local fileSourceMap = _G.__TS__sourcemap[file]
                if fileSourceMap ~= nil and fileSourceMap[line] ~= nil then
                    local chunkName = (__TS__Match(file, "%[string \"([^\"]+)\"%]"))
                    local sourceName = string.gsub(chunkName, ".lua$", ".ts")
                    local data = fileSourceMap[line]
                    if type(data) == "number" then
                        return (sourceName .. ":") .. tostring(data)
                    end
                    return (data.file .. ":") .. tostring(data.line)
                end
                return (file .. ":") .. line
            end
            result = string.gsub(
                result,
                "(%[string \"[^\"]+\"%]):(%d+)",
                function(file, line) return stringReplacer(nil, file, line) end
            )
            return result
        end
    end
end

local function __TS__Spread(iterable)
    local arr = {}
    if type(iterable) == "string" then
        for i = 0, #iterable - 1 do
            arr[i + 1] = __TS__StringAccess(iterable, i)
        end
    else
        local len = 0
        for ____, item in __TS__Iterator(iterable) do
            len = len + 1
            arr[len] = item
        end
    end
    return __TS__Unpack(arr)
end

local function __TS__StringCharAt(self, pos)
    if pos ~= pos then
        pos = 0
    end
    if pos < 0 then
        return ""
    end
    return string.sub(self, pos + 1, pos + 1)
end

local function __TS__StringCharCodeAt(self, index)
    if index ~= index then
        index = 0
    end
    if index < 0 then
        return 0 / 0
    end
    return string.byte(self, index + 1) or 0 / 0
end

local function __TS__StringEndsWith(self, searchString, endPosition)
    if endPosition == nil or endPosition > #self then
        endPosition = #self
    end
    return string.sub(self, endPosition - #searchString + 1, endPosition) == searchString
end

local function __TS__StringPadEnd(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if maxLength == -math.huge or maxLength == math.huge then
        error("Invalid string length", 0)
    end
    if #self >= maxLength or #fillString == 0 then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = fillString .. string.rep(
            fillString,
            math.floor(maxLength / #fillString)
        )
    end
    return self .. string.sub(
        fillString,
        1,
        math.floor(maxLength)
    )
end

local function __TS__StringPadStart(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if maxLength == -math.huge or maxLength == math.huge then
        error("Invalid string length", 0)
    end
    if #self >= maxLength or #fillString == 0 then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = fillString .. string.rep(
            fillString,
            math.floor(maxLength / #fillString)
        )
    end
    return string.sub(
        fillString,
        1,
        math.floor(maxLength)
    ) .. self
end

local __TS__StringReplace
do
    local sub = string.sub
    function __TS__StringReplace(source, searchValue, replaceValue)
        local startPos, endPos = string.find(source, searchValue, nil, true)
        if not startPos then
            return source
        end
        local before = sub(source, 1, startPos - 1)
        local replacement = type(replaceValue) == "string" and replaceValue or replaceValue(nil, searchValue, startPos - 1, source)
        local after = sub(source, endPos + 1)
        return (before .. replacement) .. after
    end
end

local __TS__StringSplit
do
    local sub = string.sub
    local find = string.find
    function __TS__StringSplit(source, separator, limit)
        if limit == nil then
            limit = 4294967295
        end
        if limit == 0 then
            return {}
        end
        local result = {}
        local resultIndex = 1
        if separator == nil or separator == "" then
            for i = 1, #source do
                result[resultIndex] = sub(source, i, i)
                resultIndex = resultIndex + 1
            end
        else
            local currentPos = 1
            while resultIndex <= limit do
                local startPos, endPos = find(source, separator, currentPos, true)
                if not startPos then
                    break
                end
                result[resultIndex] = sub(source, currentPos, startPos - 1)
                resultIndex = resultIndex + 1
                currentPos = endPos + 1
            end
            if resultIndex <= limit then
                result[resultIndex] = sub(source, currentPos)
            end
        end
        return result
    end
end

local __TS__StringReplaceAll
do
    local sub = string.sub
    local find = string.find
    function __TS__StringReplaceAll(source, searchValue, replaceValue)
        if type(replaceValue) == "string" then
            local concat = table.concat(
                __TS__StringSplit(source, searchValue),
                replaceValue
            )
            if #searchValue == 0 then
                return (replaceValue .. concat) .. replaceValue
            end
            return concat
        end
        local parts = {}
        local partsIndex = 1
        if #searchValue == 0 then
            parts[1] = replaceValue(nil, "", 0, source)
            partsIndex = 2
            for i = 1, #source do
                parts[partsIndex] = sub(source, i, i)
                parts[partsIndex + 1] = replaceValue(nil, "", i, source)
                partsIndex = partsIndex + 2
            end
        else
            local currentPos = 1
            while true do
                local startPos, endPos = find(source, searchValue, currentPos, true)
                if not startPos then
                    break
                end
                parts[partsIndex] = sub(source, currentPos, startPos - 1)
                parts[partsIndex + 1] = replaceValue(nil, searchValue, startPos - 1, source)
                partsIndex = partsIndex + 2
                currentPos = endPos + 1
            end
            parts[partsIndex] = sub(source, currentPos)
        end
        return table.concat(parts)
    end
end

local function __TS__StringSlice(self, start, ____end)
    if start == nil or start ~= start then
        start = 0
    end
    if ____end ~= ____end then
        ____end = 0
    end
    if start >= 0 then
        start = start + 1
    end
    if ____end ~= nil and ____end < 0 then
        ____end = ____end - 1
    end
    return string.sub(self, start, ____end)
end

local function __TS__StringStartsWith(self, searchString, position)
    if position == nil or position < 0 then
        position = 0
    end
    return string.sub(self, position + 1, #searchString + position) == searchString
end

local function __TS__StringSubstr(self, from, length)
    if from ~= from then
        from = 0
    end
    if length ~= nil then
        if length ~= length or length <= 0 then
            return ""
        end
        length = length + from
    end
    if from >= 0 then
        from = from + 1
    end
    return string.sub(self, from, length)
end

local function __TS__StringTrim(self)
    local result = string.gsub(self, "^[%s ﻿]*(.-)[%s ﻿]*$", "%1")
    return result
end

local function __TS__StringTrimEnd(self)
    local result = string.gsub(self, "[%s ﻿]*$", "")
    return result
end

local function __TS__StringTrimStart(self)
    local result = string.gsub(self, "^[%s ﻿]*", "")
    return result
end

local __TS__SymbolRegistryFor, __TS__SymbolRegistryKeyFor
do
    local symbolRegistry = {}
    function __TS__SymbolRegistryFor(key)
        if not symbolRegistry[key] then
            symbolRegistry[key] = __TS__Symbol(key)
        end
        return symbolRegistry[key]
    end
    function __TS__SymbolRegistryKeyFor(sym)
        for key in pairs(symbolRegistry) do
            if symbolRegistry[key] == sym then
                return key
            end
        end
        return nil
    end
end

local function __TS__TypeOf(value)
    local luaType = type(value)
    if luaType == "table" then
        return "object"
    elseif luaType == "nil" then
        return "undefined"
    else
        return luaType
    end
end

local function __TS__Using(self, cb, ...)
    local args = {...}
    local thrownError
    local ok, result = xpcall(
        function() return cb(__TS__Unpack(args)) end,
        function(err)
            thrownError = err
            return thrownError
        end
    )
    local argArray = {__TS__Unpack(args)}
    do
        local i = #argArray - 1
        while i >= 0 do
            local ____self_0 = argArray[i + 1]
            ____self_0[Symbol.dispose](____self_0)
            i = i - 1
        end
    end
    if not ok then
        error(thrownError, 0)
    end
    return result
end

local function __TS__UsingAsync(self, cb, ...)
    local args = {...}
    return __TS__AsyncAwaiter(function(____awaiter_resolve)
        local thrownError
        local ok, result = xpcall(
            function() return cb(
                nil,
                __TS__Unpack(args)
            ) end,
            function(err)
                thrownError = err
                return thrownError
            end
        )
        local argArray = {__TS__Unpack(args)}
        do
            local i = #argArray - 1
            while i >= 0 do
                if argArray[i + 1][Symbol.dispose] ~= nil then
                    local ____self_0 = argArray[i + 1]
                    ____self_0[Symbol.dispose](____self_0)
                end
                if argArray[i + 1][Symbol.asyncDispose] ~= nil then
                    local ____self_1 = argArray[i + 1]
                    __TS__Await(____self_1[Symbol.asyncDispose](____self_1))
                end
                i = i - 1
            end
        end
        if not ok then
            error(thrownError, 0)
        end
        return ____awaiter_resolve(nil, result)
    end)
end

return {
  __TS__ArrayAt = __TS__ArrayAt,
  __TS__ArrayConcat = __TS__ArrayConcat,
  __TS__ArrayEntries = __TS__ArrayEntries,
  __TS__ArrayEvery = __TS__ArrayEvery,
  __TS__ArrayFill = __TS__ArrayFill,
  __TS__ArrayFilter = __TS__ArrayFilter,
  __TS__ArrayForEach = __TS__ArrayForEach,
  __TS__ArrayFind = __TS__ArrayFind,
  __TS__ArrayFindIndex = __TS__ArrayFindIndex,
  __TS__ArrayFrom = __TS__ArrayFrom,
  __TS__ArrayIncludes = __TS__ArrayIncludes,
  __TS__ArrayIndexOf = __TS__ArrayIndexOf,
  __TS__ArrayIsArray = __TS__ArrayIsArray,
  __TS__ArrayJoin = __TS__ArrayJoin,
  __TS__ArrayMap = __TS__ArrayMap,
  __TS__ArrayPush = __TS__ArrayPush,
  __TS__ArrayPushArray = __TS__ArrayPushArray,
  __TS__ArrayReduce = __TS__ArrayReduce,
  __TS__ArrayReduceRight = __TS__ArrayReduceRight,
  __TS__ArrayReverse = __TS__ArrayReverse,
  __TS__ArrayUnshift = __TS__ArrayUnshift,
  __TS__ArraySort = __TS__ArraySort,
  __TS__ArraySlice = __TS__ArraySlice,
  __TS__ArraySome = __TS__ArraySome,
  __TS__ArraySplice = __TS__ArraySplice,
  __TS__ArrayToObject = __TS__ArrayToObject,
  __TS__ArrayFlat = __TS__ArrayFlat,
  __TS__ArrayFlatMap = __TS__ArrayFlatMap,
  __TS__ArraySetLength = __TS__ArraySetLength,
  __TS__ArrayToReversed = __TS__ArrayToReversed,
  __TS__ArrayToSorted = __TS__ArrayToSorted,
  __TS__ArrayToSpliced = __TS__ArrayToSpliced,
  __TS__ArrayWith = __TS__ArrayWith,
  __TS__AsyncAwaiter = __TS__AsyncAwaiter,
  __TS__Await = __TS__Await,
  __TS__Class = __TS__Class,
  __TS__ClassExtends = __TS__ClassExtends,
  __TS__CloneDescriptor = __TS__CloneDescriptor,
  __TS__CountVarargs = __TS__CountVarargs,
  __TS__Decorate = __TS__Decorate,
  __TS__DecorateLegacy = __TS__DecorateLegacy,
  __TS__DecorateParam = __TS__DecorateParam,
  __TS__Delete = __TS__Delete,
  __TS__DelegatedYield = __TS__DelegatedYield,
  __TS__DescriptorGet = __TS__DescriptorGet,
  __TS__DescriptorSet = __TS__DescriptorSet,
  Error = Error,
  RangeError = RangeError,
  ReferenceError = ReferenceError,
  SyntaxError = SyntaxError,
  TypeError = TypeError,
  URIError = URIError,
  __TS__FunctionBind = __TS__FunctionBind,
  __TS__Generator = __TS__Generator,
  __TS__InstanceOf = __TS__InstanceOf,
  __TS__InstanceOfObject = __TS__InstanceOfObject,
  __TS__Iterator = __TS__Iterator,
  __TS__LuaIteratorSpread = __TS__LuaIteratorSpread,
  Map = Map,
  __TS__MapGroupBy = __TS__MapGroupBy,
  __TS__Match = __TS__Match,
  __TS__MathAtan2 = __TS__MathAtan2,
  __TS__MathModf = __TS__MathModf,
  __TS__MathSign = __TS__MathSign,
  __TS__MathTrunc = __TS__MathTrunc,
  __TS__New = __TS__New,
  __TS__Number = __TS__Number,
  __TS__NumberIsFinite = __TS__NumberIsFinite,
  __TS__NumberIsInteger = __TS__NumberIsInteger,
  __TS__NumberIsNaN = __TS__NumberIsNaN,
  __TS__ParseInt = __TS__ParseInt,
  __TS__ParseFloat = __TS__ParseFloat,
  __TS__NumberToString = __TS__NumberToString,
  __TS__NumberToFixed = __TS__NumberToFixed,
  __TS__ObjectAssign = __TS__ObjectAssign,
  __TS__ObjectDefineProperty = __TS__ObjectDefineProperty,
  __TS__ObjectEntries = __TS__ObjectEntries,
  __TS__ObjectFromEntries = __TS__ObjectFromEntries,
  __TS__ObjectGetOwnPropertyDescriptor = __TS__ObjectGetOwnPropertyDescriptor,
  __TS__ObjectGetOwnPropertyDescriptors = __TS__ObjectGetOwnPropertyDescriptors,
  __TS__ObjectGroupBy = __TS__ObjectGroupBy,
  __TS__ObjectKeys = __TS__ObjectKeys,
  __TS__ObjectRest = __TS__ObjectRest,
  __TS__ObjectValues = __TS__ObjectValues,
  __TS__ParseFloat = __TS__ParseFloat,
  __TS__ParseInt = __TS__ParseInt,
  __TS__Promise = __TS__Promise,
  __TS__PromiseAll = __TS__PromiseAll,
  __TS__PromiseAllSettled = __TS__PromiseAllSettled,
  __TS__PromiseAny = __TS__PromiseAny,
  __TS__PromiseRace = __TS__PromiseRace,
  Set = Set,
  __TS__SetDescriptor = __TS__SetDescriptor,
  __TS__SparseArrayNew = __TS__SparseArrayNew,
  __TS__SparseArrayPush = __TS__SparseArrayPush,
  __TS__SparseArraySpread = __TS__SparseArraySpread,
  WeakMap = WeakMap,
  WeakSet = WeakSet,
  __TS__SourceMapTraceBack = __TS__SourceMapTraceBack,
  __TS__Spread = __TS__Spread,
  __TS__StringAccess = __TS__StringAccess,
  __TS__StringCharAt = __TS__StringCharAt,
  __TS__StringCharCodeAt = __TS__StringCharCodeAt,
  __TS__StringEndsWith = __TS__StringEndsWith,
  __TS__StringIncludes = __TS__StringIncludes,
  __TS__StringPadEnd = __TS__StringPadEnd,
  __TS__StringPadStart = __TS__StringPadStart,
  __TS__StringReplace = __TS__StringReplace,
  __TS__StringReplaceAll = __TS__StringReplaceAll,
  __TS__StringSlice = __TS__StringSlice,
  __TS__StringSplit = __TS__StringSplit,
  __TS__StringStartsWith = __TS__StringStartsWith,
  __TS__StringSubstr = __TS__StringSubstr,
  __TS__StringSubstring = __TS__StringSubstring,
  __TS__StringTrim = __TS__StringTrim,
  __TS__StringTrimEnd = __TS__StringTrimEnd,
  __TS__StringTrimStart = __TS__StringTrimStart,
  __TS__Symbol = __TS__Symbol,
  Symbol = Symbol,
  __TS__SymbolRegistryFor = __TS__SymbolRegistryFor,
  __TS__SymbolRegistryKeyFor = __TS__SymbolRegistryKeyFor,
  __TS__TypeOf = __TS__TypeOf,
  __TS__Unpack = __TS__Unpack,
  __TS__Using = __TS__Using,
  __TS__UsingAsync = __TS__UsingAsync
}
 end,
["src.names"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.names = {
    "OLIVIA",
    "EMMA",
    "AMELIA",
    "CHARLOTTE",
    "MIA",
    "SOPHIA",
    "ISABELLA",
    "EVELYN",
    "AVA",
    "SOFIA",
    "CAMILA",
    "HARPER",
    "LUNA",
    "ELEANOR",
    "VIOLET",
    "AURORA",
    "ELIZABETH",
    "ELIANA",
    "HAZEL",
    "CHLOE",
    "ELLIE",
    "NORA",
    "GIANNA",
    "LILY",
    "EMILY",
    "ARIA",
    "SCARLETT",
    "PENELOPE",
    "ZOE",
    "ELLA",
    "AVERY",
    "ABIGAIL",
    "MILA",
    "LUCY",
    "ISLA",
    "IVY",
    "LAYLA",
    "LAINEY",
    "NOVA",
    "GRACE",
    "WILLOW",
    "RILEY",
    "EMILIA",
    "NAOMI",
    "ELENA",
    "MADISON",
    "VALENTINA",
    "VICTORIA",
    "STELLA",
    "DELILAH",
    "MAYA",
    "HANNAH",
    "LEAH",
    "LILLIAN",
    "GENESIS",
    "JOSEPHINE",
    "SADIE",
    "ADELINE",
    "ZOEY",
    "SOPHIE",
    "PAISLEY",
    "ALICE",
    "RUBY",
    "ELOISE",
    "MADELYN",
    "LEILANI",
    "CLAIRE",
    "ADDISON",
    "AYLA",
    "EMERY",
    "IRIS",
    "EDEN",
    "NATALIE",
    "MARIA",
    "MAEVE",
    "DAISY",
    "VIVIAN",
    "CLARA",
    "AUTUMN",
    "LILIANA",
    "EVERLY",
    "AUDREY",
    "LYLA",
    "JADE",
    "KINSLEY",
    "MILLIE",
    "MADELINE",
    "JOSIE",
    "KENNEDY",
    "ATHENA",
    "MELODY",
    "CAROLINE",
    "AALIYAH",
    "ANNA",
    "SARAH",
    "QUINN",
    "LYDIA",
    "LUCIA",
    "ALLISON",
    "HAILEY",
    "AILANY",
    "CORA",
    "ARIANA",
    "PARKER",
    "NATALIA",
    "GABRIELLA",
    "SAVANNAH",
    "BROOKLYN",
    "BELLA",
    "GEORGIA",
    "JUNIPER",
    "ALAIA",
    "RAELYNN",
    "HADLEY",
    "ROSE",
    "JULIA",
    "SERENITY",
    "ELIZA",
    "MARGARET",
    "EVA",
    "AMARA",
    "MELANIE",
    "CECILIA",
    "ASHLEY",
    "RYLEE",
    "MARGOT",
    "SAMANTHA",
    "CATALINA",
    "JULIETTE",
    "AUBREY",
    "ESTHER",
    "MARY",
    "NEVAEH",
    "SKYLAR",
    "ALINA",
    "AMIRA",
    "EMBER",
    "MAGNOLIA",
    "SIENNA",
    "CHARLIE",
    "ELLIANA",
    "SUMMER",
    "ALANA",
    "BRIELLE",
    "REMI",
    "SAGE",
    "VALERIE",
    "HALLIE",
    "WRENLEY",
    "KEHLANI",
    "EMERSON",
    "JUNE",
    "SLOANE",
    "EMERSYN",
    "ELSIE",
    "OAKLYNN",
    "OAKLEY",
    "BLAKELY",
    "FREYA",
    "PIPER",
    "VALERIA",
    "ARYA",
    "ADALYNN",
    "EVERLEIGH",
    "GENEVIEVE",
    "ANASTASIA",
    "ISABEL",
    "PEYTON",
    "AMAYA",
    "ISABELLE",
    "OLIVE",
    "RUTH",
    "XIMENA",
    "EVANGELINE",
    "KATHERINE",
    "CALLIE",
    "ROSALIE",
    "ALANI",
    "LILAH",
    "KAIA",
    "BRIANNA",
    "BAILEY",
    "PHOEBE",
    "VIVIENNE",
    "ANDREA",
    "MYLA",
    "LIA",
    "SARA",
    "KYLIE",
    "REESE",
    "ANNIE",
    "DAPHNE",
    "ADA",
    "ADALINE",
    "ARIANNA",
    "ARIELLA",
    "SUTTON",
    "CELESTE",
    "JASMINE",
    "MACKENZIE",
    "HAVEN",
    "SCOTTIE",
    "GEMMA",
    "ANA",
    "TATUM",
    "ARABELLA",
    "LILA",
    "MOLLY",
    "STEVIE",
    "BLAKE",
    "AITANA",
    "ALAINA",
    "WREN",
    "RIVER",
    "NOELLE",
    "DELANEY",
    "JOURNEE",
    "BLAIR",
    "ADALYN",
    "KAYLEE",
    "ALEXANDRA",
    "MABEL",
    "NORAH",
    "PRESLEY",
    "ALORA",
    "VERA",
    "CELINE",
    "AMY",
    "BRYNLEE",
    "NYLA",
    "SAYLOR",
    "KHLOE",
    "ANTONELLA",
    "ZARA",
    "ALIYAH",
    "CATALEYA",
    "LENNON",
    "KIARA",
    "CAMILLE",
    "DAHLIA",
    "KAYLANI",
    "MARIANA",
    "DIANA",
    "REAGAN",
    "SELENA",
    "KIMBERLY",
    "RACHEL",
    "GRACIE",
    "FAITH",
    "JULIANA",
    "MIRIAM",
    "ELISE",
    "NOA",
    "ELAINA",
    "MAISIE",
    "LILITH",
    "COLLINS",
    "PALMER",
    "LILLY",
    "SHILOH",
    "OPHELIA",
    "ELIANNA",
    "LENA",
    "HARMONY",
    "ASPEN",
    "ROWAN",
    "GIA",
    "LEILA",
    "JANE",
    "TALIA",
    "ADELAIDE",
    "DAKOTA",
    "LOLA",
    "LUCILLE",
    "KAILANI",
    "MORGAN",
    "ZURI",
    "MILANI",
    "DANIELA",
    "SELAH",
    "ALESSIA",
    "ANGELA",
    "JULIET",
    "EVIE",
    "AMORA",
    "RORY",
    "MARLEY",
    "SYDNEY",
    "ALANNA",
    "LEIA",
    "LUCIANA",
    "KAMILA",
    "HARLOW",
    "KALI",
    "OCTAVIA",
    "AMARI",
    "SAWYER",
    "GABRIELA",
    "ARIEL",
    "MAGGIE",
    "ROSEMARY",
    "RYLEIGH",
    "TESSA",
    "EVELYNN",
    "LONDYN",
    "DANNA",
    "AMINA",
    "BROOKE",
    "SAMARA",
    "KENDALL",
    "ROSIE",
    "ALAYNA",
    "ANGELINA",
    "FRANCESCA",
    "ADELYN",
    "FATIMA",
    "HOPE",
    "NICOLE",
    "NAYELI",
    "CATHERINE",
    "NINA",
    "JOURNEY",
    "ADRIANA",
    "CAMILLA",
    "AILANI",
    "MALIA",
    "MEADOW",
    "JORDYN",
    "JOANNA",
    "EMORY",
    "MALANI",
    "SERENA",
    "TEAGAN",
    "AURELIA",
    "VANESSA",
    "KAYLA",
    "NAVY",
    "POPPY",
    "KALANI",
    "REGINA",
    "ADELINA",
    "REBECCA",
    "ARIYAH",
    "ESME",
    "HEIDI",
    "AISHA",
    "JULIETA",
    "THEA",
    "ANNABELLE",
    "ESMERALDA",
    "LAUREN",
    "JULIANNA",
    "TAYLOR",
    "WRENLEE",
    "LONDON",
    "GISELLE",
    "SABRINA",
    "AZALEA",
    "LAURA",
    "SYLVIE",
    "SYLVIA",
    "ALAYA",
    "RAYA",
    "ELORA",
    "FINLEY",
    "MYA",
    "DREAM",
    "VIVIANA",
    "ELAINE",
    "ELODIE",
    "LAILA",
    "SUNNY",
    "BRIELLA",
    "LANA",
    "PAIGE",
    "ITZEL",
    "MCKENNA",
    "MELISSA",
    "FRANCES",
    "MIRA",
    "PAYTON",
    "HATTIE",
    "ASTRID",
    "BRYNN",
    "WINTER",
    "AYLIN",
    "MILEY",
    "RAVEN",
    "JOCELYN",
    "MARYAM",
    "LOGAN",
    "VERONICA",
    "GWENDOLYN",
    "ANYA",
    "LEIGHTON",
    "ALIVIA",
    "HARLEY",
    "CHARLEE",
    "ALYSSA",
    "COLETTE",
    "HAYDEN",
    "LORELAI",
    "JAYLA",
    "IVORY",
    "ANAYA",
    "FIONA",
    "TRINITY",
    "AUBREE",
    "MICHELLE",
    "MATILDA",
    "LILLIANA",
    "MALLORY",
    "MARIAH",
    "HELENA",
    "WYNTER",
    "CARMEN",
    "ALAYAH",
    "LIANA",
    "HOLLY",
    "MADILYN",
    "PHOENIX",
    "RAELYN",
    "WILLA",
    "HELEN",
    "EMELY",
    "ALESSANDRA",
    "GRACELYNN",
    "CAROLINA",
    "ARLETH",
    "SALEM",
    "DOROTHY",
    "XIOMARA",
    "ELISA",
    "REIGN",
    "FLORENCE",
    "ALICIA",
    "MADELEINE",
    "MELANY",
    "KATALINA",
    "ZARIAH",
    "BONNIE",
    "JOY",
    "KALIYAH",
    "HAISLEY",
    "SARAI",
    "BLAIRE",
    "ELOWYN",
    "SAIGE",
    "ADELYNN",
    "OPAL",
    "DEMI",
    "NYLAH",
    "EMMY",
    "CAMRYN",
    "KIRA",
    "LORELEI",
    "DALEYZA",
    "RAEGAN",
    "MAIA",
    "BIANCA",
    "ANIYAH",
    "ANNALISE",
    "ALEXANDRIA",
    "AMIRAH",
    "ALISON",
    "ANAHI",
    "GRACELYN",
    "BROOKLYNN",
    "MIRACLE",
    "EVERLEE",
    "ADHARA",
    "ALMA",
    "MACIE",
    "MURPHY",
    "ROMINA",
    "CASSIDY",
    "CLEMENTINE",
    "HEAVEN",
    "ELLE",
    "SKYE",
    "DESTINY",
    "LYRA",
    "RYLIE",
    "PARIS",
    "CAMERON",
    "FELICITY",
    "MADDISON",
    "LEONA",
    "SCARLET",
    "KORA",
    "MARIAM",
    "MEREDITH",
    "MCKENZIE",
    "DAYANA",
    "CALI",
    "AMANDA",
    "ARIELLE",
    "ANGEL",
    "CALLIOPE",
    "FERNANDA",
    "ESTELLA",
    "APRIL",
    "IZABELLA",
    "HANNA",
    "MARCELINE",
    "ALEXIS",
    "CARTER",
    "DANIELLA",
    "MARLEE",
    "VIRGINIA",
    "KATALEYA",
    "HALO",
    "NADIA",
    "AMIYAH",
    "MADELYNN",
    "EMERIE",
    "RENATA",
    "OAKLEE",
    "REMINGTON",
    "MAXINE",
    "NELLIE",
    "BRIAR",
    "DANIELLE",
    "CHARLI",
    "MAKENNA",
    "IMANI",
    "ARMANI",
    "EDITH",
    "NALANI",
    "MAE",
    "VIENNA",
    "HADASSAH",
    "STEPHANIE",
    "ARI",
    "KATE",
    "JIMENA",
    "BRIANA",
    "FAYE",
    "JORDAN",
    "LOUISE",
    "AMBER",
    "MAKAYLA",
    "ZAHRA",
    "LYLAH",
    "MARGO",
    "AMOURA",
    "JENNIFER",
    "KYLA",
    "MYLAH",
    "WINNIE",
    "ALISSON",
    "AMALIA",
    "REINA",
    "AVIANNA",
    "ALLIE",
    "IVANNA",
    "ARIYA",
    "LILIAN",
    "ALIA",
    "AYLANI",
    "NOAH",
    "REYNA",
    "LEXI",
    "BRINLEY",
    "IYLA",
    "MAVIS",
    "LINA",
    "CECELIA",
    "EVE",
    "MAREN",
    "MONROE",
    "CAPRI",
    "EMELIA",
    "JESSICA",
    "HALLE",
    "ALEJANDRA",
    "GABRIELLE",
    "YARA",
    "BEATRICE",
    "DELLA",
    "KAMRYN",
    "KATIE",
    "ARIAH",
    "ARLETTE",
    "NOEMI",
    "ALONDRA",
    "MALIYAH",
    "MARA",
    "JACQUELINE",
    "JAZLYN",
    "FRANKIE",
    "ANGIE",
    "EILEEN",
    "LYRIC",
    "ALIANA",
    "SIERRA",
    "ROSALIA",
    "OAKLYN",
    "CHAYA",
    "AMAIA",
    "LEYLA",
    "HOLLAND",
    "CLEO",
    "JREAM",
    "LESLIE",
    "SEVYN",
    "JOLENE",
    "MINA",
    "KEIRA",
    "LEGACY",
    "TIANA",
    "ELLIOTT",
    "CASSANDRA",
    "JAYLANI",
    "PRISCILLA",
    "RHEA",
    "KINLEY",
    "CLOVER",
    "ESTRELLA",
    "ZARIYAH",
    "JOURNI",
    "MIRANDA",
    "ANGELICA",
    "MARLOWE",
    "JOVIE",
    "ABBY",
    "SARIYAH",
    "KENZIE",
    "OAKLEIGH",
    "AYA",
    "SIENA",
    "EMBERLY",
    "MELINA",
    "AMANI",
    "BRISTOL",
    "ESTELLE",
    "GALILEA",
    "IRENE",
    "MARIE",
    "MARINA",
    "MAKENZIE",
    "SASHA",
    "PAISLEE",
    "ISABELA",
    "GOLDIE",
    "MYRA",
    "DAVINA",
    "FLORA",
    "ANNE",
    "AZARIAH",
    "INDIE",
    "KAITLYN",
    "JAZMIN",
    "GLORIA",
    "GEORGINA",
    "SHELBY",
    "DALLAS",
    "THALIA",
    "ALIZA",
    "AVERIE",
    "SKYLER",
    "MACY",
    "ROSA",
    "DULCE",
    "KHALEESI",
    "MARILYN",
    "MARTHA",
    "ADLEY",
    "BELEN",
    "ELLIANNA",
    "KELSEY",
    "NIA",
    "CHANA",
    "LAKELYNN",
    "SELENE",
    "LOTTIE",
    "LORETTA",
    "ALEENA",
    "ILA",
    "DANI",
    "REMY",
    "WHITLEY",
    "JENNA",
    "LILLIE",
    "KENNEDI",
    "VIOLETA",
    "KENDRA",
    "LENNOX",
    "LANEY",
    "AVIANA",
    "SOLANA",
    "VEDA",
    "MARIGOLD",
    "BILLIE",
    "DREW",
    "DYLAN",
    "ELLIS",
    "GWEN",
    "AMAYAH",
    "MILAN",
    "LEILANY",
    "RYAN",
    "BRIDGET",
    "CHRISTINA",
    "EZRA",
    "AINSLEY",
    "EMERALD",
    "HANA",
    "NOOR",
    "RIVKA",
    "AMELIE",
    "JENESIS",
    "ROYALTY",
    "LENORA",
    "TAYTUM",
    "JAMIE",
    "KATHRYN",
    "AILEEN",
    "ARLET",
    "CORALINE",
    "KIANA",
    "KYRA",
    "ARACELI",
    "AZARIA",
    "KENNA",
    "MONICA",
    "BETHANY",
    "LAUREL",
    "CHARLEY",
    "KARLA",
    "KAYLEIGH",
    "RAYNA",
    "LOUISA",
    "CELIA",
    "EMMIE",
    "FALLON",
    "PERSEPHONE",
    "WINONA",
    "MARISOL",
    "LARA",
    "KENSLEY",
    "MCKINLEY",
    "MICHAELA",
    "NOVALEE",
    "ELYSE",
    "LACEY",
    "PENNY",
    "ZELDA",
    "ALENA",
    "LUZ",
    "KEILANI",
    "NALA",
    "PAULA",
    "BIRDIE",
    "KARSYN",
    "LAKELYN",
    "MILLER",
    "JEMMA",
    "ALEAH",
    "INAYA",
    "MEGAN",
    "SLOAN",
    "CHARLEIGH",
    "ROSALINA",
    "ANDI",
    "NOLA",
    "JULIE",
    "ADRIANNA",
    "KAELI",
    "ADDILYN",
    "FREYJA",
    "RAMONA",
    "SAMIRA",
    "KARINA",
    "DENVER",
    "JANELLE",
    "MIKAYLA",
    "SERAPHINA",
    "HALEY",
    "INDY",
    "PAULINA",
    "ROWYN",
    "MILANA",
    "CHELSEA",
    "ELINA",
    "MILENA",
    "VALERY",
    "IVEY",
    "MACI",
    "STORMI",
    "BRITTANY",
    "MADILYNN",
    "AILA",
    "YARELI",
    "YARETZI",
    "ZAYLEE",
    "ERIN",
    "ADELE",
    "ROBIN",
    "JALIYAH",
    "MAISY",
    "PEARL",
    "ADALEE",
    "BRYNLEIGH",
    "KEYLA",
    "ALEXA",
    "BAYLOR",
    "JESSIE",
    "CIELO",
    "BRAELYNN",
    "ALIANNA",
    "THEODORA",
    "MALAYA",
    "MEILANI",
    "TALLULAH",
    "ANALIA",
    "NYOMI",
    "PROMISE",
    "SOL",
    "XYLA",
    "KYLEE",
    "MARJORIE",
    "TREASURE",
    "SOLEIL",
    "ZARIA",
    "CYNTHIA",
    "LUELLA",
    "SKY",
    "AYLEEN",
    "NERIAH",
    "ILIANA",
    "JUDITH",
    "OCEAN",
    "LEA",
    "LINDA",
    "LIVIA",
    "MADDIE",
    "MAGDALENA",
    "ELIA",
    "KAHLANI",
    "MICAH",
    "TIFFANY",
    "WRENLEIGH",
    "ZANIYAH",
    "KALLIE",
    "LOVE",
    "ANDIE",
    "JOHANNA",
    "MERCY",
    "SKYLA",
    "ALIYA",
    "DEBORAH",
    "ZAINAB",
    "ANAIS",
    "GRETA",
    "KAIYA",
    "MALAYSIA",
    "MARIANNA",
    "AMARIS",
    "BARBARA",
    "BELLAMY",
    "DALIA",
    "ANIKA",
    "GIANA",
    "KEZIAH",
    "NATALY",
    "CHEYENNE",
    "KELLY",
    "LUISA",
    "SALMA",
    "TERESA",
    "AURA",
    "CARLY",
    "LIV",
    "AZARI",
    "DAFNE",
    "REBEKAH",
    "AMIRI",
    "BERKLEY",
    "EMBERLYNN",
    "HUNTER",
    "JAYCEE",
    "ALEXIA",
    "REYA",
    "RUTHIE",
    "ELEANORA",
    "JANIYAH",
    "ROSALYN",
    "GIULIANA",
    "EMILIANA",
    "NOVAH",
    "TRU",
    "KORI",
    "ASPYN",
    "CHANDLER",
    "KAILANY",
    "LILYANA",
    "ELOWEN",
    "KHALANI",
    "NAYA",
    "ZYLA",
    "JOLIE",
    "LEANNA",
    "YAMILETH",
    "CATTLEYA",
    "ELISABETH",
    "ENSLEY",
    "ASHLYN",
    "ALLYSON",
    "AUGUST",
    "KIMBER",
    "MARLEIGH",
    "SORAYA",
    "ANAIAH",
    "ANALEIA",
    "WAVERLY",
    "YASMIN",
    "ZORA",
    "JOELLE",
    "LILIA",
    "NANCY",
    "ICELYNN",
    "INDIGO",
    "ARELY",
    "LAYLANI",
    "ROMY",
    "SCOUT",
    "AYRA",
    "GIOVANNA",
    "SIYA",
    "KATELYN",
    "MADALYN",
    "NATASHA",
    "ALAIYA",
    "HONEY",
    "LETTIE",
    "SARAHI",
    "ELSA",
    "EMMELINE",
    "HADLEE",
    "LILIANNA",
    "ZENDAYA",
    "AINHOA",
    "ELLIOT",
    "JAZMINE",
    "AADHYA",
    "GUINEVERE",
    "RAYNE",
    "CLARE",
    "SAANVI",
    "CAMPBELL",
    "SALOME",
    "TILLY",
    "YUSRA",
    "AKIRA",
    "HENLEY",
    "LYANNA",
    "QUINCY",
    "ROSALEE",
    "VADA",
    "AINARA",
    "ANNIKA",
    "AYAH",
    "VIOLETTE",
    "ALEIA",
    "KAYA",
    "MAZIE",
    "AMYRA",
    "CELINA",
    "MIKAELA",
    "PALOMA",
    "ELOUISE",
    "ETTA",
    "JULIETTA",
    "KAMIYAH",
    "ZOYA",
    "JAYLEEN",
    "KASSIDY",
    "KEILY",
    "HARLEE",
    "KIERA",
    "LIBERTY",
    "DARCY",
    "DIOR",
    "LISA",
    "MALKA",
    "ARISBETH",
    "KARA",
    "BAILEE",
    "ELANI",
    "HARMONI",
    "MARIELLA",
    "ZAYLA",
    "EMI",
    "JIANNA",
    "MAELYNN",
    "AVANI",
    "LAVENDER",
    "KARTER",
    "RAINA",
    "LIAM",
    "NOAH",
    "OLIVER",
    "THEODORE",
    "JAMES",
    "HENRY",
    "MATEO",
    "ELIJAH",
    "LUCAS",
    "WILLIAM",
    "BENJAMIN",
    "LEVI",
    "EZRA",
    "SEBASTIAN",
    "JACK",
    "DANIEL",
    "SAMUEL",
    "MICHAEL",
    "ETHAN",
    "ASHER",
    "JOHN",
    "HUDSON",
    "LUCA",
    "LEO",
    "ELIAS",
    "OWEN",
    "ALEXANDER",
    "DYLAN",
    "SANTIAGO",
    "JULIAN",
    "DAVID",
    "JOSEPH",
    "MATTHEW",
    "LUKE",
    "JACKSON",
    "MAVERICK",
    "MILES",
    "WYATT",
    "THOMAS",
    "ISAAC",
    "JACOB",
    "MASON",
    "GABRIEL",
    "ANTHONY",
    "CARTER",
    "LOGAN",
    "AIDEN",
    "GRAYSON",
    "CALEB",
    "COOPER",
    "CHARLES",
    "ROMAN",
    "JOSIAH",
    "EZEKIEL",
    "THIAGO",
    "ISAIAH",
    "JOSHUA",
    "WESLEY",
    "JAYDEN",
    "BENNETT",
    "NATHAN",
    "ANGEL",
    "NOLAN",
    "WAYLON",
    "CAMERON",
    "BROOKS",
    "ANDREW",
    "BEAU",
    "WESTON",
    "ROWAN",
    "ADRIAN",
    "LINCOLN",
    "ENZO",
    "IAN",
    "KAI",
    "CHRISTIAN",
    "AXEL",
    "AARON",
    "THEO",
    "SILAS",
    "WALKER",
    "JONATHAN",
    "LEONARDO",
    "EVERETT",
    "MICAH",
    "RYAN",
    "AUGUST",
    "GAEL",
    "ROBERT",
    "JOSE",
    "ELI",
    "JEREMIAH",
    "LUKA",
    "AMIR",
    "JAXON",
    "PARKER",
    "COLTON",
    "MYLES",
    "ADAM",
    "ATLAS",
    "XAVIER",
    "EASTON",
    "JORDAN",
    "ARTHUR",
    "LANDON",
    "AUSTIN",
    "DOMINIC",
    "ADRIEL",
    "DAMIAN",
    "VINCENT",
    "RIVER",
    "EMILIANO",
    "JACE",
    "ARCHER",
    "LORENZO",
    "JAMESON",
    "NICHOLAS",
    "EMMETT",
    "MILO",
    "HARRISON",
    "GIOVANNI",
    "CARSON",
    "GEORGE",
    "KAYDEN",
    "JONAH",
    "GREYSON",
    "HUNTER",
    "GRAHAM",
    "LUIS",
    "DECLAN",
    "SAWYER",
    "JASPER",
    "RYDER",
    "CARLOS",
    "CONNOR",
    "JUAN",
    "MATTEO",
    "DAWSON",
    "CALVIN",
    "LEON",
    "DEAN",
    "EVAN",
    "NATHANIEL",
    "DIEGO",
    "ARLO",
    "BRYSON",
    "JASON",
    "MALACHI",
    "ELLIOT",
    "ZION",
    "EMILIO",
    "IVAN",
    "HAYDEN",
    "STETSON",
    "JUDE",
    "LEGEND",
    "MATIAS",
    "CALLUM",
    "HAYES",
    "JETT",
    "COLE",
    "ELLIOTT",
    "JESUS",
    "ACE",
    "BECKETT",
    "ALAN",
    "BECKHAM",
    "JAYCE",
    "BRAXTON",
    "JAXSON",
    "AMARI",
    "CHASE",
    "RHETT",
    "MAX",
    "CHARLIE",
    "FELIX",
    "KINGSTON",
    "JUDAH",
    "ANTONIO",
    "EMMANUEL",
    "MAXWELL",
    "RYKER",
    "ALEJANDRO",
    "NICOLAS",
    "BARRETT",
    "JESSE",
    "ASHTON",
    "MIGUEL",
    "BRAYDEN",
    "TYLER",
    "PETER",
    "CAMDEN",
    "ZACHARY",
    "TATUM",
    "KEVIN",
    "ANDRES",
    "FINN",
    "JUSTIN",
    "TUCKER",
    "BENTLEY",
    "ZAYDEN",
    "MESSIAH",
    "ABRAHAM",
    "ALEX",
    "ADONIS",
    "KAIDEN",
    "TIMOTHY",
    "KNOX",
    "TATE",
    "CADEN",
    "AYDEN",
    "NICO",
    "VICTOR",
    "MADDOX",
    "XANDER",
    "OSCAR",
    "COLTER",
    "JOEL",
    "ABEL",
    "PATRICK",
    "RAFAEL",
    "GRIFFIN",
    "BRODY",
    "JAZIEL",
    "RORY",
    "EITHAN",
    "EDWARD",
    "RILEY",
    "BRANDON",
    "MILAN",
    "RICHARD",
    "MALAKAI",
    "ISMAEL",
    "KYRIE",
    "LOUIS",
    "ELIAN",
    "KAIRO",
    "COHEN",
    "NASH",
    "GRANT",
    "CALLAN",
    "DALLAS",
    "HARVEY",
    "MUHAMMAD",
    "MARK",
    "JAVIER",
    "KARTER",
    "ZAYN",
    "CREW",
    "ERIC",
    "SIMON",
    "AZIEL",
    "CYRUS",
    "GAVIN",
    "MARCUS",
    "RONAN",
    "DEREK",
    "AVERY",
    "OMAR",
    "LANE",
    "WARREN",
    "LENNOX",
    "PAUL",
    "BLAKE",
    "JEREMY",
    "TRISTAN",
    "LUKAS",
    "STEVEN",
    "EMERSON",
    "WALTER",
    "CADE",
    "ELLIS",
    "OTTO",
    "PHOENIX",
    "COLT",
    "ATTICUS",
    "KALEB",
    "ISRAEL",
    "TOBIAS",
    "HOLDEN",
    "SAINT",
    "ROMEO",
    "KENNETH",
    "JORGE",
    "ANGELO",
    "REMINGTON",
    "PAXTON",
    "CODY",
    "FINLEY",
    "KAYSON",
    "KOA",
    "KASH",
    "JOSUE",
    "ARES",
    "HENDRIX",
    "BRYCE",
    "ZYAIRE",
    "REID",
    "BRIAN",
    "BODHI",
    "CRUZ",
    "KADEN",
    "BRYAN",
    "ZANE",
    "FRANCISCO",
    "MARTIN",
    "BRADY",
    "CASEY",
    "SHEPHERD",
    "AIDAN",
    "BAKER",
    "MALCOLM",
    "JAX",
    "CASH",
    "CLAYTON",
    "KOHEN",
    "LEONEL",
    "CRISTIAN",
    "BOWEN",
    "DANTE",
    "ALI",
    "JAYLEN",
    "ORION",
    "BRIGGS",
    "JENSEN",
    "DAKOTA",
    "PRESTON",
    "MAXIMUS",
    "GIDEON",
    "ERICK",
    "ARCHIE",
    "COLIN",
    "SONNY",
    "SHILOH",
    "MATHIAS",
    "EZEQUIEL",
    "SULLIVAN",
    "JOAQUIN",
    "WADE",
    "KING",
    "NIKO",
    "DAMIEN",
    "KADE",
    "BODIE",
    "DARIEL",
    "LUCIANO",
    "CAYDEN",
    "ANDRE",
    "MANUEL",
    "FERNANDO",
    "COLSON",
    "RHYS",
    "CAIRO",
    "ANDERSON",
    "KYLER",
    "ONYX",
    "IBRAHIM",
    "CESAR",
    "TRAVIS",
    "SANTINO",
    "CALLAHAN",
    "BRADLEY",
    "BAYLOR",
    "BANKS",
    "RUSSELL",
    "DESMOND",
    "KILLIAN",
    "GRADY",
    "RYLAN",
    "STERLING",
    "KYLO",
    "EDUARDO",
    "RICARDO",
    "WELLS",
    "STEPHEN",
    "ZANDER",
    "RAYMOND",
    "HECTOR",
    "ELIAM",
    "EDWIN",
    "TITUS",
    "IKER",
    "FRANKLIN",
    "KAMARI",
    "MARCO",
    "SPENCER",
    "JULIUS",
    "KHALIL",
    "MARSHALL",
    "WILDER",
    "JARED",
    "JADEN",
    "KASHTON",
    "JAY",
    "KARSON",
    "MARIO",
    "ARI",
    "REMY",
    "PEDRO",
    "SERGIO",
    "HUGO",
    "PRINCE",
    "WINSTON",
    "PABLO",
    "FORREST",
    "AUGUSTUS",
    "KOBE",
    "OAKLEY",
    "DAXTON",
    "TADEO",
    "SAGE",
    "APOLLO",
    "LAWSON",
    "KIAN",
    "SOLOMON",
    "CHANCE",
    "KAYCE",
    "RAPHAEL",
    "REED",
    "JAKE",
    "FREDERICK",
    "ARMANI",
    "HANK",
    "NEHEMIAH",
    "ROYAL",
    "KAMERON",
    "MALIK",
    "ALIJAH",
    "KANE",
    "DALTON",
    "LEWIS",
    "NOEL",
    "BENSON",
    "SEAN",
    "CLARK",
    "MILLER",
    "KYLE",
    "KIERAN",
    "SUTTON",
    "FABIAN",
    "TANNER",
    "MARCELO",
    "ROWEN",
    "ISAIAS",
    "ZAYNE",
    "NASIR",
    "RAIDEN",
    "FRANCIS",
    "VALENTINO",
    "ROME",
    "DAMON",
    "REECE",
    "ESTEBAN",
    "EDGAR",
    "JOHNNY",
    "KYLIAN",
    "TYSON",
    "URIEL",
    "ROYCE",
    "CILLIAN",
    "KODA",
    "KYSON",
    "EDEN",
    "JALEN",
    "FRANK",
    "CONRAD",
    "JASIAH",
    "MATTHIAS",
    "ZAIRE",
    "CORBIN",
    "ASA",
    "YUSUF",
    "ERIK",
    "CALLEN",
    "KENDRICK",
    "ODIN",
    "BRANTLEY",
    "RODRIGO",
    "MARCOS",
    "GIANNI",
    "ALEXIS",
    "LUCIAN",
    "DENVER",
    "SYLAS",
    "ANDY",
    "COLLIN",
    "HEZEKIAH",
    "MOSHE",
    "FINNEGAN",
    "RONIN",
    "ATREUS",
    "ADAN",
    "EMANUEL",
    "QUINN",
    "MACK",
    "LEANDRO",
    "ROCCO",
    "RUBEN",
    "LEDGER",
    "AZARIAH",
    "DONOVAN",
    "MOSES",
    "KAIZEN",
    "ELIO",
    "LEONIDAS",
    "LAWRENCE",
    "TRIPP",
    "ARIEL",
    "ALONZO",
    "KAISON",
    "LIAN",
    "DEVIN",
    "RIO",
    "JOHNATHAN",
    "AYAAN",
    "GUNNER",
    "JEFFREY",
    "PHILIP",
    "SAMSON",
    "MOISES",
    "LUCCA",
    "MUSA",
    "CAMILO",
    "HAMZA",
    "RIDGE",
    "KOLTON",
    "MORGAN",
    "TROY",
    "KYLAN",
    "AMIRI",
    "BOONE",
    "MAKAI",
    "JOHAN",
    "BRUCE",
    "DORIAN",
    "GREGORY",
    "PIERCE",
    "ROY",
    "DREW",
    "CLAY",
    "CAIDEN",
    "ENRIQUE",
    "JAMIR",
    "LELAND",
    "MOHAMED",
    "ALESSANDRO",
    "DEACON",
    "AUGUSTINE",
    "DOMINICK",
    "ROBERTO",
    "KASEN",
    "ZAIN",
    "JONAS",
    "EMIR",
    "SETH",
    "SAUL",
    "JAMARI",
    "LIONEL",
    "GARRETT",
    "JAIDEN",
    "FLETCHER",
    "SCOTT",
    "ARMANDO",
    "CASSIUS",
    "KASON",
    "ZACHARIAH",
    "FORD",
    "SOREN",
    "ZAIDEN",
    "ALLEN",
    "LOUIE",
    "RONALD",
    "ALDEN",
    "ARTURO",
    "CASPIAN",
    "RAYAN",
    "MAJOR",
    "ARJUN",
    "COLBY",
    "ELIEL",
    "KREW",
    "ANDER",
    "KENZO",
    "MAXIMILIAN",
    "MEMPHIS",
    "NIKOLAI",
    "SAMIR",
    "OCEAN",
    "ANAKIN",
    "GERARDO",
    "KEEGAN",
    "MAXIMO",
    "MOHAMMED",
    "KAYSEN",
    "JULIO",
    "MOHAMMAD",
    "GUNNAR",
    "SHANE",
    "OZZY",
    "ZAKAI",
    "SINCERE",
    "JAIME",
    "ALBERT",
    "AZRIEL",
    "IZAIAH",
    "JAXTON",
    "RAUL",
    "YOSEF",
    "CREED",
    "RHODES",
    "PRINCETON",
    "PORTER",
    "CASSIAN",
    "OMARI",
    "TRU",
    "CHOSEN",
    "REESE",
    "JAYCEON",
    "JAYSON",
    "JAMIE",
    "REIGN",
    "TREVOR",
    "PHILLIP",
    "BOSTON",
    "KAMDEN",
    "CRUE",
    "ELISEO",
    "COLSEN",
    "KEANU",
    "MAURICIO",
    "SALEM",
    "DARIO",
    "DAX",
    "JASE",
    "SHAWN",
    "VICENTE",
    "GUSTAVO",
    "DANNY",
    "MYLO",
    "KYRO",
    "WILSON",
    "DAVIS",
    "JAKARI",
    "JAKAI",
    "TRUETT",
    "HASSAN",
    "CHRIS",
    "SAM",
    "BRIXTON",
    "KYAIRE",
    "URIAH",
    "AZAEL",
    "WESTLEY",
    "ROCKY",
    "PEYTON",
    "SEVYN",
    "DILAN",
    "DRAKE",
    "ZAID",
    "ROLAND",
    "DERECK",
    "BRAYLEN",
    "HARLAN",
    "TAYLOR",
    "RIGGS",
    "AHMAD",
    "CAL",
    "MARVIN",
    "DONALD",
    "LEONARD",
    "NATHANAEL",
    "AARAV",
    "ABDIEL",
    "KAREEM",
    "COREY",
    "EMMITT",
    "WYLDER",
    "KOEN",
    "JUNIOR",
    "ZYAIR",
    "ZAYD",
    "DUSTIN",
    "WAYNE",
    "AHMED",
    "MADDEN",
    "QUINCY",
    "BELLAMY",
    "LACHLAN",
    "LAYTON",
    "AMIAS",
    "CHAIM",
    "LAYNE",
    "MAC",
    "AMOS",
    "BRIAR",
    "CARMELO",
    "ARIES",
    "BRUNO",
    "HOUSTON",
    "JULIEN",
    "TRACE",
    "BROCK",
    "YAHYA",
    "CONOR",
    "DENNIS",
    "DUKE",
    "ABRAM",
    "JEFFERSON",
    "VINCENZO",
    "IZAN",
    "LEE",
    "FINNLEY",
    "BRAYAN",
    "RAYLAN",
    "ENOCH",
    "AVYAAN",
    "DEXTER",
    "SALVADOR",
    "CASE",
    "MISAEL",
    "FOREST",
    "NIKOLAS",
    "WESTIN",
    "BRAYLON",
    "CLYDE",
    "RYLAND",
    "OTIS",
    "TOMMY",
    "ZEKE",
    "YEHUDA",
    "TOMAS",
    "AZRAEL",
    "DUTTON",
    "FLYNN",
    "CHANDLER",
    "IDRIS",
    "ZAMIR",
    "AMBROSE",
    "FRANCO",
    "HUXLEY",
    "WES",
    "CHOZEN",
    "DARIUS",
    "VALENTIN",
    "ALBERTO",
    "MAGNUS",
    "ROGER",
    "BENICIO",
    "BRYCEN",
    "MARCEL",
    "RYATT",
    "ZAHIR",
    "KEITH",
    "RAYDEN",
    "JAMISON",
    "TEO",
    "SKYLER",
    "BLAZE",
    "CAYSON",
    "HUGH",
    "YAHIR",
    "CANNON",
    "YOUSEF",
    "BJORN",
    "NOE",
    "ALONSO",
    "ALVARO",
    "EVANDER",
    "KENAI",
    "AURELIO",
    "JAHMIR",
    "LOCHLAN",
    "ARON",
    "HARRY",
    "NELSON",
    "RAY",
    "ALFREDO",
    "ABDULLAH",
    "ARYAN",
    "CONNER",
    "LENNON",
    "BRIDGER",
    "WESTYN",
    "JASIEL",
    "QUENTIN",
    "TREY",
    "YAEL",
    "ALVIN",
    "CASEN",
    "DAKARI",
    "REX",
    "DAMIR",
    "WAYLEN",
    "IZAEL",
    "JEREMIAS",
    "KAISER",
    "KOLSON",
    "BEN",
    "KYREE",
    "TONY",
    "BODE",
    "JESIAH",
    "EIDEN",
    "JAXXON",
    "JEDIDIAH",
    "REMI",
    "ROBIN",
    "SANTANA",
    "KYREN",
    "LANDEN",
    "EZRAH",
    "MURPHY",
    "CASTIEL",
    "BODEN",
    "DERRICK",
    "KARIM",
    "MUSTAFA",
    "REY",
    "RUDY",
    "EMERY",
    "IGNACIO",
    "JETTSON",
    "BEAR",
    "EDISON",
    "RICKY",
    "RAMON",
    "ANDERS",
    "GAGE",
    "GUILLERMO",
    "SANTOS",
    "KOLTER",
    "QUINTON",
    "AXTON",
    "ABNER",
    "ALFRED",
    "DARWIN",
    "ROHAN",
    "LANCE",
    "AVI",
    "KEATON",
    "ORLANDO",
    "EVEREST",
    "JAGGER",
    "ELISHA",
    "HEATH",
    "JONES",
    "THADDEUS",
    "ALLAN",
    "CASON",
    "DOUGLAS",
    "ISSAC",
    "KENJI",
    "MATHEO",
    "ASAIAH",
    "JIMMY",
    "ARIAN",
    "OZIAS",
    "LEROY",
    "NEIL",
    "WATSON",
    "AGUSTIN",
    "BRYER",
    "JERRY",
    "DILLON",
    "EREN",
    "EUGENE",
    "AYAN",
    "MELVIN",
    "NIXON",
    "REUBEN",
    "STANLEY",
    "GREY",
    "LOYAL",
    "ALEC",
    "CASPER",
    "DANE",
    "AZAIAH",
    "BYRON",
    "JOE",
    "EMORY",
    "ZAYLEN",
    "MASSIMO",
    "TRENTON",
    "GATLIN",
    "JOEY",
    "BENNY",
    "JON",
    "JRUE",
    "GIAN",
    "SEVEN",
    "COLTEN",
    "ERNESTO",
    "FISHER",
    "TEDDY",
    "KAISEN",
    "ZECHARIAH",
    "DARIAN",
    "SALVATORE",
    "JERICHO",
    "MITCHELL",
    "ALISTAIR",
    "CALUM",
    "VAN",
    "ZEV",
    "LANGSTON",
    "MCCOY",
    "ULISES",
    "LUCIEN",
    "BENEDICT",
    "CARLO",
    "COLESON",
    "MEIR",
    "HENRIK",
    "JIRAIYA",
    "KELLAN",
    "ALFONSO",
    "AZAI",
    "CAMPBELL",
    "KYLEN",
    "FELIPE",
    "LEIF",
    "ROWDY",
    "CURTIS",
    "AMEER",
    "KIAAN",
    "MAURICE",
    "KRUE",
    "SHIMON",
    "ZYON",
    "DAMARI",
    "JAIRO",
    "KHALID",
    "KABIR",
    "JIREH",
    "MATHEW",
    "SHEPARD",
    "EDDIE",
    "ISAEL",
    "ARDEN",
    "CEDRIC",
    "NAZIR",
    "ALESSIO",
    "KHAI",
    "MARCELLUS",
    "WESSON",
    "YISROEL",
    "ZYMIR",
    "LANDYN",
    "DARREN",
    "LEGACY",
    "DEVON",
    "JUDSON",
    "VIHAAN",
    "YITZCHOK",
    "ZEN",
    "DANGELO",
    "ADLER",
    "ASPEN",
    "BRODIE",
    "KASE",
    "KHAZA",
    "MORDECHAI",
    "DASH",
    "MAKARI",
    "NEO",
    "ZAVIER",
    "EVREN",
    "IMRAN",
    "LAITH",
    "CAIN",
    "IRA",
    "OSIRIS",
    "SHLOMO",
    "YAAKOV",
    "EPHRAIM",
    "SHMUEL",
    "WALLACE",
    "YESHUA",
    "KANNON",
    "KINGSLEY",
    "NOA",
    "TRUE",
    "ERMIAS",
    "HAROLD",
    "JOZIAH",
    "RENE",
    "TRUCE",
    "ALDO",
    "DIMITRI",
    "HALO",
    "RONNIE",
    "VANCE",
    "ADEN",
    "ISHAAN",
    "KACE",
    "STEFAN"
}
return ____exports
 end,
["src.constants"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____names = require("src.names")
local names = ____names.names
____exports.ROWS = 5
____exports.COLS = 10
____exports.NAMES_TO_FIND = names
____exports.CELL_WIDTH = 30
____exports.CELL_HEIGHT = 30
____exports.GRID_OFFSET_X = 50
____exports.GRID_OFFSET_Y = 60
____exports.FROZEN_CELL = "#"
____exports.INITIAL_FREEZE_THRESHOLD = 100 * 30
____exports.MIN_FREEZE_THRESHOLD = 30 * 5
____exports.FREEZE_DECREMENT = 30 * 2
____exports.TICK_RATE_MS = 33
____exports.MAX_ACCUMULATOR_MS = 250
____exports.CARET_SPEED_DIVISOR = 200
____exports.CARET_BOUNCE_AMPLITUDE = 3
____exports.CARET_SIZE = 6
____exports.CURSOR_LERP_SPEED = 0.025
return ____exports
 end,
["src.grid"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local ____exports = {}
local ____constants = require("src.constants")
local ROWS = ____constants.ROWS
local COLS = ____constants.COLS
____exports.randomChar = function() return string.char(65 + math.floor(math.random() * 26)) end
____exports.createInitialGrid = function()
    return __TS__ArrayFrom(
        {length = ROWS},
        function() return __TS__ArrayFrom(
            {length = COLS},
            function() return ____exports.randomChar(nil) end
        ) end
    )
end
____exports.shuffleArray = function(____, array)
    local newArr = {table.unpack(array)}
    do
        local i = #newArr - 1
        while i > 0 do
            local j = math.floor(math.random() * (i + 1))
            local ____temp_0 = {newArr[j + 1], newArr[i + 1]}
            newArr[i + 1] = ____temp_0[1]
            newArr[j + 1] = ____temp_0[2]
            i = i - 1
        end
    end
    return newArr
end
return ____exports
 end,
["src.types"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
 end,
["src.state"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local ____exports = {}
local ____constants = require("src.constants")
local INITIAL_FREEZE_THRESHOLD = ____constants.INITIAL_FREEZE_THRESHOLD
local ROWS = ____constants.ROWS
local COLS = ____constants.COLS
local function createZeroArray(____, len)
    local arr = {}
    do
        local i = 0
        while i < len do
            arr[#arr + 1] = 0
            i = i + 1
        end
    end
    return arr
end
____exports.gameState = {
    grid = {},
    boldMask = __TS__ArrayFrom(
        {length = ROWS},
        function() return __TS__ArrayFrom(
            {length = COLS},
            function() return false end
        ) end
    ),
    intersections = __TS__ArrayFrom(
        {length = ROWS},
        function() return __TS__ArrayFrom(
            {length = COLS},
            function() return false end
        ) end
    ),
    detectedNames = {},
    particles = {},
    mode = "column",
    cursor = {x = 0, y = 0},
    visualCursor = {x = 0, y = 0},
    rowOffsets = createZeroArray(nil, ROWS),
    colOffsets = createZeroArray(nil, COLS),
    score = 0,
    crankAccumulator = 0,
    freezeTimer = 0,
    freezeThreshold = INITIAL_FREEZE_THRESHOLD,
    gameOver = false,
    started = false,
    gridDirty = true,
    lastInteractionTime = 0,
    fps = 0,
    dt = 0
}
return ____exports
 end,
["src.logic.matching"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__StringCharCodeAt = ____lualib.__TS__StringCharCodeAt
local Set = ____lualib.Set
local __TS__New = ____lualib.__TS__New
local __TS__ArraySort = ____lualib.__TS__ArraySort
local ____exports = {}
local ____state = require("src.state")
local gameState = ____state.gameState
local ____constants = require("src.constants")
local ROWS = ____constants.ROWS
local COLS = ____constants.COLS
local NAMES_TO_FIND = ____constants.NAMES_TO_FIND
local GRID_OFFSET_X = ____constants.GRID_OFFSET_X
local GRID_OFFSET_Y = ____constants.GRID_OFFSET_Y
local CELL_WIDTH = ____constants.CELL_WIDTH
local CELL_HEIGHT = ____constants.CELL_HEIGHT
local INTERSECTION_COUNTS = nil
local ROW_USAGE = nil
local COL_USAGE = nil
local NAME_BUCKETS = nil
local NAME_MASKS = nil
local function createZeroArray(____, len)
    local arr = {}
    do
        local i = 0
        while i < len do
            arr[#arr + 1] = 0
            i = i + 1
        end
    end
    return arr
end
local function clearBuffer(____, buf)
    do
        local i = 0
        while i < #buf do
            buf[i + 1] = 0
            i = i + 1
        end
    end
end
local function getCharMask(____, str)
    local mask = 0
    do
        local i = 0
        while i < #str do
            local code = __TS__StringCharCodeAt(str, i)
            local ____bit = -1
            if code >= 65 and code <= 90 then
                ____bit = code - 65
            elseif code >= 97 and code <= 122 then
                ____bit = code - 97
            end
            if ____bit >= 0 then
                mask = mask | 1 << ____bit
            end
            i = i + 1
        end
    end
    return mask
end
local function initBuffers()
    if NAME_BUCKETS then
        return
    end
    NAME_BUCKETS = {}
    do
        local i = 0
        while i < 26 do
            NAME_BUCKETS[#NAME_BUCKETS + 1] = {}
            i = i + 1
        end
    end
    NAME_MASKS = {}
    for ____, name in ipairs(NAMES_TO_FIND) do
        do
            if not name then
                NAME_MASKS[#NAME_MASKS + 1] = 0
                goto __continue18
            end
            local code = string.byte(name, 1) or 0 / 0
            local index = -1
            if code >= 65 and code <= 90 then
                index = code - 65
            elseif code >= 97 and code <= 122 then
                index = code - 97
            end
            if index >= 0 then
                local ____NAME_BUCKETS_index_0 = NAME_BUCKETS[index + 1]
                ____NAME_BUCKETS_index_0[#____NAME_BUCKETS_index_0 + 1] = name
            end
            NAME_MASKS[#NAME_MASKS + 1] = getCharMask(nil, name)
        end
        ::__continue18::
    end
    if not INTERSECTION_COUNTS then
        INTERSECTION_COUNTS = createZeroArray(nil, ROWS * COLS)
    end
    if not ROW_USAGE then
        ROW_USAGE = createZeroArray(nil, COLS)
    end
    if not COL_USAGE then
        COL_USAGE = createZeroArray(nil, ROWS)
    end
end
____exports.MatchingLogic = {
    markDirty = function()
        gameState.gridDirty = true
        gameState.lastInteractionTime = playdate.getCurrentTimeMilliseconds()
        gameState.detectedNames = {}
        do
            local r = 0
            while r < ROWS do
                do
                    local c = 0
                    while c < COLS do
                        gameState.boldMask[r + 1][c + 1] = false
                        gameState.intersections[r + 1][c + 1] = false
                        c = c + 1
                    end
                end
                r = r + 1
            end
        end
    end,
    recalculateBoldMask = function()
        initBuffers(nil)
        local buckets = NAME_BUCKETS
        local intersectionCounts = INTERSECTION_COUNTS
        local rowUsage = ROW_USAGE
        local colUsage = COL_USAGE
        gameState.detectedNames = {}
        clearBuffer(nil, intersectionCounts)
        local allMatches = {}
        local padding = 2
        do
            local r = 0
            while r < ROWS do
                local rowStr = table.concat(gameState.grid[r + 1], "")
                local rowMask = getCharMask(nil, rowStr)
                local rowMatches = {}
                local checkedBuckets = __TS__New(Set)
                do
                    local i = 0
                    while i < #rowStr do
                        local code = __TS__StringCharCodeAt(rowStr, i)
                        local idx = -1
                        if code >= 65 and code <= 90 then
                            idx = code - 65
                        end
                        if idx >= 0 and not checkedBuckets:has(idx) then
                            checkedBuckets:add(idx)
                            local bucket = buckets[idx + 1]
                            for ____, name in ipairs(bucket) do
                                do
                                    local nMask = getCharMask(nil, name)
                                    if rowMask & nMask ~= nMask then
                                        goto __continue39
                                    end
                                    local startIndex = 0
                                    while true do
                                        startIndex = (string.find(
                                            rowStr,
                                            name,
                                            math.max(startIndex + 1, 1),
                                            true
                                        ) or 0) - 1
                                        if not (startIndex > -1) then
                                            break
                                        end
                                        rowMatches[#rowMatches + 1] = {
                                            text = name,
                                            r = r,
                                            c = startIndex,
                                            isRow = true,
                                            len = #name,
                                            drawX = GRID_OFFSET_X + startIndex * CELL_WIDTH + padding,
                                            drawY = GRID_OFFSET_Y + r * CELL_HEIGHT + padding,
                                            drawW = #name * CELL_WIDTH - padding * 2,
                                            drawH = CELL_HEIGHT - padding * 2,
                                            mask = nMask
                                        }
                                        startIndex = startIndex + 1
                                    end
                                end
                                ::__continue39::
                            end
                        end
                        i = i + 1
                    end
                end
                if #rowMatches > 0 then
                    __TS__ArraySort(
                        rowMatches,
                        function(____, a, b) return b.len - a.len end
                    )
                    clearBuffer(nil, rowUsage)
                    for ____, m in ipairs(rowMatches) do
                        local fits = true
                        do
                            local i = 0
                            while i < m.len do
                                if rowUsage[m.c + i + 1] >= 2 then
                                    fits = false
                                    break
                                end
                                i = i + 1
                            end
                        end
                        if fits then
                            do
                                local i = 0
                                while i < m.len do
                                    local ____rowUsage_1, ____temp_2 = rowUsage, m.c + i + 1
                                    ____rowUsage_1[____temp_2] = ____rowUsage_1[____temp_2] + 1
                                    i = i + 1
                                end
                            end
                            allMatches[#allMatches + 1] = m
                        end
                    end
                end
                r = r + 1
            end
        end
        do
            local c = 0
            while c < COLS do
                local colStr = ""
                do
                    local r = 0
                    while r < ROWS do
                        colStr = colStr .. gameState.grid[r + 1][c + 1]
                        r = r + 1
                    end
                end
                local colMask = getCharMask(nil, colStr)
                local colMatches = {}
                local checkedBuckets = __TS__New(Set)
                do
                    local i = 0
                    while i < #colStr do
                        local code = __TS__StringCharCodeAt(colStr, i)
                        local idx = -1
                        if code >= 65 and code <= 90 then
                            idx = code - 65
                        end
                        if idx >= 0 and not checkedBuckets:has(idx) then
                            checkedBuckets:add(idx)
                            local bucket = buckets[idx + 1]
                            for ____, name in ipairs(bucket) do
                                do
                                    local nMask = getCharMask(nil, name)
                                    if colMask & nMask ~= nMask then
                                        goto __continue61
                                    end
                                    local startIndex = 0
                                    while true do
                                        startIndex = (string.find(
                                            colStr,
                                            name,
                                            math.max(startIndex + 1, 1),
                                            true
                                        ) or 0) - 1
                                        if not (startIndex > -1) then
                                            break
                                        end
                                        colMatches[#colMatches + 1] = {
                                            text = name,
                                            r = startIndex,
                                            c = c,
                                            isRow = false,
                                            len = #name,
                                            drawX = GRID_OFFSET_X + c * CELL_WIDTH + padding,
                                            drawY = GRID_OFFSET_Y + startIndex * CELL_HEIGHT + padding,
                                            drawW = CELL_WIDTH - padding * 2,
                                            drawH = #name * CELL_HEIGHT - padding * 2,
                                            mask = nMask
                                        }
                                        startIndex = startIndex + 1
                                    end
                                end
                                ::__continue61::
                            end
                        end
                        i = i + 1
                    end
                end
                if #colMatches > 0 then
                    __TS__ArraySort(
                        colMatches,
                        function(____, a, b) return b.len - a.len end
                    )
                    clearBuffer(nil, colUsage)
                    for ____, m in ipairs(colMatches) do
                        local fits = true
                        do
                            local i = 0
                            while i < m.len do
                                if colUsage[m.r + i + 1] >= 2 then
                                    fits = false
                                    break
                                end
                                i = i + 1
                            end
                        end
                        if fits then
                            do
                                local i = 0
                                while i < m.len do
                                    local ____colUsage_3, ____temp_4 = colUsage, m.r + i + 1
                                    ____colUsage_3[____temp_4] = ____colUsage_3[____temp_4] + 1
                                    i = i + 1
                                end
                            end
                            allMatches[#allMatches + 1] = m
                        end
                    end
                end
                c = c + 1
            end
        end
        gameState.detectedNames = allMatches
        for ____, name in ipairs(allMatches) do
            if name.isRow then
                do
                    local i = 0
                    while i < name.len do
                        gameState.boldMask[name.r + 1][name.c + i + 1] = true
                        local ____intersectionCounts_5, ____temp_6 = intersectionCounts, name.r * COLS + (name.c + i) + 1
                        ____intersectionCounts_5[____temp_6] = ____intersectionCounts_5[____temp_6] + 1
                        i = i + 1
                    end
                end
            else
                do
                    local i = 0
                    while i < name.len do
                        gameState.boldMask[name.r + i + 1][name.c + 1] = true
                        local ____intersectionCounts_7, ____temp_8 = intersectionCounts, (name.r + i) * COLS + name.c + 1
                        ____intersectionCounts_7[____temp_8] = ____intersectionCounts_7[____temp_8] + 1
                        i = i + 1
                    end
                end
            end
        end
        do
            local i = 0
            while i < #intersectionCounts do
                if intersectionCounts[i + 1] > 1 then
                    local r = math.floor(i / COLS)
                    local c = i % COLS
                    gameState.intersections[r + 1][c + 1] = true
                end
                i = i + 1
            end
        end
        gameState.gridDirty = false
    end,
    doNamesIntersect = function(____, a, b)
        if a.isRow == b.isRow then
            if a.isRow then
                if a.r ~= b.r then
                    return false
                end
                return a.c < b.c + b.len and a.c + a.len > b.c
            else
                if a.c ~= b.c then
                    return false
                end
                return a.r < b.r + b.len and a.r + a.len > b.r
            end
        end
        local row = a.isRow and a or b
        local col = a.isRow and b or a
        local colX = col.c
        local rowY = row.r
        return colX >= row.c and colX < row.c + row.len and rowY >= col.r and rowY < col.r + col.len
    end
}
return ____exports
 end,
["src.logic.particles"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local ____exports = {}
local ____state = require("src.state")
local gameState = ____state.gameState
local ____constants = require("src.constants")
local GRID_OFFSET_X = ____constants.GRID_OFFSET_X
local GRID_OFFSET_Y = ____constants.GRID_OFFSET_Y
local CELL_WIDTH = ____constants.CELL_WIDTH
local CELL_HEIGHT = ____constants.CELL_HEIGHT
____exports.ParticleSystem = {
    spawnExplosion = function(____, c, r)
        local centerX = GRID_OFFSET_X + c * CELL_WIDTH + CELL_WIDTH / 2
        local centerY = GRID_OFFSET_Y + r * CELL_HEIGHT + CELL_HEIGHT / 2
        local count = 5 + math.floor(math.random() * 3)
        do
            local i = 0
            while i < count do
                local ____gameState_particles_0 = gameState.particles
                ____gameState_particles_0[#____gameState_particles_0 + 1] = {
                    x = centerX,
                    y = centerY,
                    vx = (math.random() - 0.5) * 4,
                    vy = (math.random() - 0.5) * 4,
                    size = 1 + math.floor(math.random() * 2),
                    life = 10 + math.floor(math.random() * 10)
                }
                i = i + 1
            end
        end
    end,
    updateParticles = function()
        do
            local i = #gameState.particles - 1
            while i >= 0 do
                local p = gameState.particles[i + 1]
                p.x = p.x + p.vx
                p.y = p.y + p.vy
                p.life = p.life - 1
                p.vy = p.vy + 0.2
                if p.life <= 0 then
                    __TS__ArraySplice(gameState.particles, i, 1)
                end
                i = i - 1
            end
        end
    end
}
return ____exports
 end,
["src.sound"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local moveSynth = nil
local explosionSynth = nil
local modeSynth = nil
____exports.SoundManager = {
    playMove = function()
        if not moveSynth then
            local synthNew = playdate.sound.synth.new
            moveSynth = synthNew(playdate.sound.kWaveSquare)
            moveSynth:setADSR(0, 0.1, 0, 0)
            moveSynth:setVolume(0.3)
        end
        moveSynth:playNote(523.25)
    end,
    playExplosion = function()
        if not explosionSynth then
            local synthNew = playdate.sound.synth.new
            explosionSynth = synthNew(playdate.sound.kWaveNoise)
            explosionSynth:setADSR(0, 0.3, 0, 0)
            explosionSynth:setVolume(0.4)
        end
        explosionSynth:playNote(60)
    end,
    playModeSwitch = function()
        if not modeSynth then
            local synthNew = playdate.sound.synth.new
            modeSynth = synthNew(playdate.sound.kWaveTriangle)
            modeSynth:setADSR(0, 0.15, 0, 0)
            modeSynth:setVolume(0.3)
        end
        modeSynth:playNote(440)
    end
}
return ____exports
 end,
["src.logic.game"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local Set = ____lualib.Set
local __TS__New = ____lualib.__TS__New
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ParseInt = ____lualib.__TS__ParseInt
local ____exports = {}
local ____state = require("src.state")
local gameState = ____state.gameState
local ____constants = require("src.constants")
local INITIAL_FREEZE_THRESHOLD = ____constants.INITIAL_FREEZE_THRESHOLD
local MIN_FREEZE_THRESHOLD = ____constants.MIN_FREEZE_THRESHOLD
local FREEZE_DECREMENT = ____constants.FREEZE_DECREMENT
local FROZEN_CELL = ____constants.FROZEN_CELL
local ROWS = ____constants.ROWS
local COLS = ____constants.COLS
local ____grid = require("src.grid")
local createInitialGrid = ____grid.createInitialGrid
local randomChar = ____grid.randomChar
local ____matching = require("src.logic.matching")
local MatchingLogic = ____matching.MatchingLogic
local ____particles = require("src.logic.particles")
local ParticleSystem = ____particles.ParticleSystem
local ____sound = require("src.sound")
local SoundManager = ____sound.SoundManager
____exports.GameLifecycle = {
    startGame = function()
        gameState.started = true
        ____exports.GameLifecycle:resetGame()
    end,
    resetGame = function()
        gameState.grid = createInitialGrid(nil)
        gameState.score = 0
        gameState.gameOver = false
        gameState.started = true
        gameState.freezeTimer = 0
        gameState.freezeThreshold = INITIAL_FREEZE_THRESHOLD
        gameState.cursor = {x = 0, y = 0}
        gameState.particles = {}
        MatchingLogic:markDirty()
    end,
    updateFreeze = function()
        if gameState.gameOver then
            return
        end
        gameState.freezeTimer = gameState.freezeTimer + 1
        if gameState.freezeTimer >= gameState.freezeThreshold then
            gameState.freezeTimer = 0
            gameState.freezeThreshold = math.max(MIN_FREEZE_THRESHOLD, gameState.freezeThreshold - FREEZE_DECREMENT)
            local validSpots = {}
            do
                local r = 0
                while r < ROWS do
                    do
                        local c = 0
                        while c < COLS do
                            if gameState.grid[r + 1][c + 1] ~= FROZEN_CELL then
                                validSpots[#validSpots + 1] = {r = r, c = c}
                            end
                            c = c + 1
                        end
                    end
                    r = r + 1
                end
            end
            if #validSpots > 0 then
                local randomSpot = validSpots[math.floor(math.random() * #validSpots) + 1]
                gameState.grid[randomSpot.r + 1][randomSpot.c + 1] = FROZEN_CELL
                ParticleSystem:spawnExplosion(randomSpot.c, randomSpot.r)
                SoundManager:playExplosion()
                MatchingLogic:markDirty()
                if #validSpots == 1 then
                    gameState.gameOver = true
                end
            else
                gameState.gameOver = true
            end
        end
    end,
    checkNameMatch = function()
        if gameState.gridDirty then
            MatchingLogic:recalculateBoldMask()
        end
        local ____gameState_0 = gameState
        local mode = ____gameState_0.mode
        local cursor = ____gameState_0.cursor
        if mode ~= "name" then
            gameState.mode = "name"
            return
        end
        local startMatch = __TS__ArrayFind(
            gameState.detectedNames,
            function(____, n)
                if n.isRow then
                    return n.r == cursor.y and cursor.x >= n.c and cursor.x < n.c + n.len
                else
                    return n.c == cursor.x and cursor.y >= n.r and cursor.y < n.r + n.len
                end
            end
        )
        if not startMatch then
            return
        end
        local chain = __TS__New(Set)
        local queue = {startMatch}
        chain:add(startMatch)
        while #queue > 0 do
            local current = table.remove(queue)
            for ____, candidate in ipairs(gameState.detectedNames) do
                if not chain:has(candidate) then
                    if MatchingLogic:doNamesIntersect(current, candidate) then
                        chain:add(candidate)
                        queue[#queue + 1] = candidate
                    end
                end
            end
        end
        local chainScore = 0
        local cellsToClear = __TS__New(Set)
        chain:forEach(function(____, name)
            chainScore = chainScore + name.len * 100
            if name.isRow then
                do
                    local i = 0
                    while i < name.len do
                        cellsToClear:add((tostring(name.r) .. ",") .. tostring(name.c + i))
                        i = i + 1
                    end
                end
            else
                do
                    local i = 0
                    while i < name.len do
                        cellsToClear:add((tostring(name.r + i) .. ",") .. tostring(name.c))
                        i = i + 1
                    end
                end
            end
        end)
        if chain.size > 1 then
            chainScore = chainScore + (chain.size - 1) * 50
        end
        gameState.score = gameState.score + chainScore
        gameState.freezeTimer = math.floor(gameState.freezeTimer * 0.5)
        cellsToClear:forEach(function(____, key)
            local rStr, cStr = table.unpack(
                __TS__StringSplit(key, ","),
                1,
                2
            )
            local r = __TS__ParseInt(rStr)
            local c = __TS__ParseInt(cStr)
            if gameState.grid[r + 1][c + 1] ~= FROZEN_CELL then
                ParticleSystem:spawnExplosion(c, r)
                gameState.grid[r + 1][c + 1] = randomChar(nil)
            end
        end)
        if cellsToClear.size > 0 then
            SoundManager:playExplosion()
        end
        MatchingLogic:markDirty()
        MatchingLogic:recalculateBoldMask()
    end,
    tick = function()
        ParticleSystem:updateParticles()
        local DEBOUNCE_DELAY = 150
        if gameState.gridDirty then
            local now = playdate.getCurrentTimeMilliseconds()
            if now - gameState.lastInteractionTime > DEBOUNCE_DELAY then
                MatchingLogic:recalculateBoldMask()
            end
        end
    end
}
return ____exports
 end,
["src.logic.controls"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ArrayUnshift = ____lualib.__TS__ArrayUnshift
local ____exports = {}
local ____state = require("src.state")
local gameState = ____state.gameState
local ____matching = require("src.logic.matching")
local MatchingLogic = ____matching.MatchingLogic
local ____constants = require("src.constants")
local ROWS = ____constants.ROWS
local COLS = ____constants.COLS
local FROZEN_CELL = ____constants.FROZEN_CELL
local CELL_WIDTH = ____constants.CELL_WIDTH
local CELL_HEIGHT = ____constants.CELL_HEIGHT
local ____grid = require("src.grid")
local randomChar = ____grid.randomChar
local ____sound = require("src.sound")
local SoundManager = ____sound.SoundManager
____exports.Controls = {
    handleLeft = function()
        SoundManager:playMove()
        if gameState.mode == "column" then
            gameState.cursor.x = (gameState.cursor.x - 1 + COLS) % COLS
        elseif gameState.mode == "row" then
            local row = gameState.cursor.y
            local first = table.remove(gameState.grid[row + 1], 1)
            if first then
                local ____gameState_grid_index_0 = gameState.grid[row + 1]
                ____gameState_grid_index_0[#____gameState_grid_index_0 + 1] = first
            end
            gameState.rowOffsets[row + 1] = CELL_WIDTH
            MatchingLogic:markDirty()
        else
            gameState.cursor.x = (gameState.cursor.x - 1 + COLS) % COLS
        end
    end,
    handleRight = function()
        SoundManager:playMove()
        if gameState.mode == "column" then
            gameState.cursor.x = (gameState.cursor.x + 1) % COLS
        elseif gameState.mode == "row" then
            local row = gameState.cursor.y
            local last = table.remove(gameState.grid[row + 1])
            if last then
                __TS__ArrayUnshift(gameState.grid[row + 1], last)
            end
            gameState.rowOffsets[row + 1] = -CELL_WIDTH
            MatchingLogic:markDirty()
        else
            gameState.cursor.x = (gameState.cursor.x + 1) % COLS
        end
    end,
    handleUp = function()
        SoundManager:playMove()
        if gameState.mode == "column" then
            local col = gameState.cursor.x
            local topChar = gameState.grid[1][col + 1]
            do
                local r = 0
                while r < ROWS - 1 do
                    gameState.grid[r + 1][col + 1] = gameState.grid[r + 1 + 1][col + 1]
                    r = r + 1
                end
            end
            gameState.grid[ROWS][col + 1] = topChar
            gameState.colOffsets[col + 1] = CELL_HEIGHT
            MatchingLogic:markDirty()
        else
            gameState.cursor.y = (gameState.cursor.y - 1 + ROWS) % ROWS
        end
    end,
    handleDown = function()
        SoundManager:playMove()
        if gameState.mode == "column" then
            local col = gameState.cursor.x
            local bottomChar = gameState.grid[ROWS][col + 1]
            do
                local r = ROWS - 1
                while r > 0 do
                    gameState.grid[r + 1][col + 1] = gameState.grid[r][col + 1]
                    r = r - 1
                end
            end
            gameState.grid[1][col + 1] = bottomChar
            gameState.colOffsets[col + 1] = -CELL_HEIGHT
            MatchingLogic:markDirty()
        else
            gameState.cursor.y = (gameState.cursor.y + 1) % ROWS
        end
    end,
    toggleMode = function()
        SoundManager:playModeSwitch()
        if gameState.mode == "column" then
            gameState.mode = "row"
        elseif gameState.mode == "row" then
            gameState.mode = "column"
        else
            gameState.mode = "column"
        end
    end,
    processCrank = function(____, change)
        gameState.crankAccumulator = gameState.crankAccumulator + change
        if math.abs(gameState.crankAccumulator) >= 360 then
            if gameState.crankAccumulator > 0 then
                gameState.crankAccumulator = gameState.crankAccumulator - 360
            else
                gameState.crankAccumulator = gameState.crankAccumulator + 360
            end
            local ____gameState_1 = gameState
            local mode = ____gameState_1.mode
            local cursor = ____gameState_1.cursor
            local grid = ____gameState_1.grid
            if mode == "row" then
                do
                    local c = 0
                    while c < COLS do
                        if grid[cursor.y + 1][c + 1] ~= FROZEN_CELL then
                            grid[cursor.y + 1][c + 1] = randomChar(nil)
                        end
                        c = c + 1
                    end
                end
            elseif mode == "column" then
                do
                    local r = 0
                    while r < ROWS do
                        if grid[r + 1][cursor.x + 1] ~= FROZEN_CELL then
                            grid[r + 1][cursor.x + 1] = randomChar(nil)
                        end
                        r = r + 1
                    end
                end
            end
            MatchingLogic:markDirty()
            SoundManager:playMove()
        end
    end
}
return ____exports
 end,
["src.logic.index"] = function(...) 
local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local ____game = require("src.logic.game")
local GameLifecycle = ____game.GameLifecycle
local ____matching = require("src.logic.matching")
local MatchingLogic = ____matching.MatchingLogic
local ____controls = require("src.logic.controls")
local Controls = ____controls.Controls
local ____particles = require("src.logic.particles")
local ParticleSystem = ____particles.ParticleSystem
____exports.GameLogic = __TS__ObjectAssign(
    {},
    GameLifecycle,
    MatchingLogic,
    Controls,
    ParticleSystem
)
return ____exports
 end,
["src.input"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____logic = require("src.logic.index")
local GameLogic = ____logic.GameLogic
local ____state = require("src.state")
local gameState = ____state.gameState
____exports.inputHandler = {
    BButtonDown = function()
        if gameState.gameOver then
            return
        end
        GameLogic:toggleMode()
    end,
    AButtonDown = function()
        if not gameState.started then
            GameLogic:startGame()
            return
        end
        if gameState.gameOver then
            GameLogic:resetGame()
        else
            GameLogic:checkNameMatch()
        end
    end,
    leftButtonDown = function()
        if not gameState.gameOver then
            GameLogic:handleLeft()
        end
    end,
    rightButtonDown = function()
        if not gameState.gameOver then
            GameLogic:handleRight()
        end
    end,
    upButtonDown = function()
        if not gameState.gameOver then
            GameLogic:handleUp()
        end
    end,
    downButtonDown = function()
        if not gameState.gameOver then
            GameLogic:handleDown()
        end
    end,
    cranked = function(____, change)
        if not gameState.gameOver then
            GameLogic:processCrank(change)
        end
    end
}
return ____exports
 end,
["src.renderer.elements"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____core = require("lua_modules.@crankscript.core.src.index")
local PlaydateColor = ____core.PlaydateColor
local ____constants = require("src.constants")
local CARET_SPEED_DIVISOR = ____constants.CARET_SPEED_DIVISOR
local CARET_BOUNCE_AMPLITUDE = ____constants.CARET_BOUNCE_AMPLITUDE
local CARET_SIZE = ____constants.CARET_SIZE
____exports.ElementsRenderer = {
    drawCapsule = function(____, drawX, drawY, w, h)
        playdate.graphics.setColor(PlaydateColor.Black)
        playdate.graphics.setLineWidth(2)
        playdate.graphics.drawRoundRect(
            drawX,
            drawY,
            w,
            h,
            10
        )
        playdate.graphics.setLineWidth(1)
    end,
    drawAnimatedCaret = function(____, cx, cy, direction)
        local tick = playdate.getCurrentTimeMilliseconds() / CARET_SPEED_DIVISOR
        local bounce = math.sin(tick) * CARET_BOUNCE_AMPLITUDE
        local size = CARET_SIZE
        playdate.graphics.setColor(PlaydateColor.Black)
        playdate.graphics.setLineWidth(2)
        local bx = cx
        local by = cy
        if direction == "left" or direction == "right" then
            bx = bx + bounce
        else
            by = by + bounce
        end
        if direction == "right" then
            playdate.graphics.drawLine(bx, by - size, bx + size, by)
            playdate.graphics.drawLine(bx + size, by, bx, by + size)
        elseif direction == "left" then
            playdate.graphics.drawLine(bx, by - size, bx - size, by)
            playdate.graphics.drawLine(bx - size, by, bx, by + size)
        elseif direction == "down" then
            playdate.graphics.drawLine(bx - size, by, bx, by + size)
            playdate.graphics.drawLine(bx, by + size, bx + size, by)
        elseif direction == "up" then
            playdate.graphics.drawLine(bx - size, by, bx, by - size)
            playdate.graphics.drawLine(bx, by - size, bx + size, by)
        end
        playdate.graphics.setLineWidth(1)
    end
}
return ____exports
 end,
["lua_modules.@crankscript.core.src.index"] = function(...) 
import "CoreLibs/keyboard"
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.PlaydateColor = PlaydateColor or ({})
____exports.PlaydateColor.Black = playdate.graphics.kColorBlack
____exports.PlaydateColor[____exports.PlaydateColor.Black] = "Black"
____exports.PlaydateColor.White = playdate.graphics.kColorWhite
____exports.PlaydateColor[____exports.PlaydateColor.White] = "White"
____exports.PlaydateColor.Clear = playdate.graphics.kColorClear
____exports.PlaydateColor[____exports.PlaydateColor.Clear] = "Clear"
____exports.PlaydateColor.XOR = playdate.graphics.kColorXOR
____exports.PlaydateColor[____exports.PlaydateColor.XOR] = "XOR"
____exports.PlaydateFlip = PlaydateFlip or ({})
____exports.PlaydateFlip.Unflipped = playdate.graphics.kImageUnflipped
____exports.PlaydateFlip[____exports.PlaydateFlip.Unflipped] = "Unflipped"
____exports.PlaydateFlip.FlippedX = playdate.graphics.kImageFlippedX
____exports.PlaydateFlip[____exports.PlaydateFlip.FlippedX] = "FlippedX"
____exports.PlaydateFlip.FlippedY = playdate.graphics.kImageFlippedY
____exports.PlaydateFlip[____exports.PlaydateFlip.FlippedY] = "FlippedY"
____exports.PlaydateFlip.FlippedXY = playdate.graphics.kImageFlippedXY
____exports.PlaydateFlip[____exports.PlaydateFlip.FlippedXY] = "FlippedXY"
____exports.PlaydatePolygonFill = PlaydatePolygonFill or ({})
____exports.PlaydatePolygonFill.NonZero = playdate.graphics.kPolygonFillNonZero
____exports.PlaydatePolygonFill[____exports.PlaydatePolygonFill.NonZero] = "NonZero"
____exports.PlaydatePolygonFill.EvenOdd = playdate.graphics.kPolygonFillEvenOdd
____exports.PlaydatePolygonFill[____exports.PlaydatePolygonFill.EvenOdd] = "EvenOdd"
____exports.PlaydateButton = PlaydateButton or ({})
____exports.PlaydateButton.Left = playdate.kButtonLeft
____exports.PlaydateButton[____exports.PlaydateButton.Left] = "Left"
____exports.PlaydateButton.Right = playdate.kButtonRight
____exports.PlaydateButton[____exports.PlaydateButton.Right] = "Right"
____exports.PlaydateButton.Up = playdate.kButtonUp
____exports.PlaydateButton[____exports.PlaydateButton.Up] = "Up"
____exports.PlaydateButton.Down = playdate.kButtonDown
____exports.PlaydateButton[____exports.PlaydateButton.Down] = "Down"
____exports.PlaydateButton.B = playdate.kButtonB
____exports.PlaydateButton[____exports.PlaydateButton.B] = "B"
____exports.PlaydateButton.A = playdate.kButtonA
____exports.PlaydateButton[____exports.PlaydateButton.A] = "A"
____exports.PlaydateLanguage = PlaydateLanguage or ({})
____exports.PlaydateLanguage.English = playdate.graphics.font.kLanguageEnglish
____exports.PlaydateLanguage[____exports.PlaydateLanguage.English] = "English"
____exports.PlaydateLanguage.Japanese = playdate.graphics.font.kLanguageJapanese
____exports.PlaydateLanguage[____exports.PlaydateLanguage.Japanese] = "Japanese"
____exports.PlaydateFileOpenMode = PlaydateFileOpenMode or ({})
____exports.PlaydateFileOpenMode.Read = playdate.file.kFileRead
____exports.PlaydateFileOpenMode[____exports.PlaydateFileOpenMode.Read] = "Read"
____exports.PlaydateFileOpenMode.Write = playdate.file.kFileWrite
____exports.PlaydateFileOpenMode[____exports.PlaydateFileOpenMode.Write] = "Write"
____exports.PlaydateFileOpenMode.Append = playdate.file.kFileAppend
____exports.PlaydateFileOpenMode[____exports.PlaydateFileOpenMode.Append] = "Append"
____exports.PlaydateDitherType = PlaydateDitherType or ({})
____exports.PlaydateDitherType.None = playdate.graphics.image.kDitherTypeNone
____exports.PlaydateDitherType[____exports.PlaydateDitherType.None] = "None"
____exports.PlaydateDitherType.DiagonalLine = playdate.graphics.image.kDitherTypeDiagonalLine
____exports.PlaydateDitherType[____exports.PlaydateDitherType.DiagonalLine] = "DiagonalLine"
____exports.PlaydateDitherType.VerticalLine = playdate.graphics.image.kDitherTypeVerticalLine
____exports.PlaydateDitherType[____exports.PlaydateDitherType.VerticalLine] = "VerticalLine"
____exports.PlaydateDitherType.HorizontalLine = playdate.graphics.image.kDitherTypeHorizontalLine
____exports.PlaydateDitherType[____exports.PlaydateDitherType.HorizontalLine] = "HorizontalLine"
____exports.PlaydateDitherType.Screen = playdate.graphics.image.kDitherTypeScreen
____exports.PlaydateDitherType[____exports.PlaydateDitherType.Screen] = "Screen"
____exports.PlaydateDitherType.Bayer2x2 = playdate.graphics.image.kDitherTypeBayer2x2
____exports.PlaydateDitherType[____exports.PlaydateDitherType.Bayer2x2] = "Bayer2x2"
____exports.PlaydateDitherType.Bayer4x4 = playdate.graphics.image.kDitherTypeBayer4x4
____exports.PlaydateDitherType[____exports.PlaydateDitherType.Bayer4x4] = "Bayer4x4"
____exports.PlaydateDitherType.Bayer8x8 = playdate.graphics.image.kDitherTypeBayer8x8
____exports.PlaydateDitherType[____exports.PlaydateDitherType.Bayer8x8] = "Bayer8x8"
____exports.PlaydateDitherType.FloydSteinberg = playdate.graphics.image.kDitherTypeFloydSteinberg
____exports.PlaydateDitherType[____exports.PlaydateDitherType.FloydSteinberg] = "FloydSteinberg"
____exports.PlaydateDitherType.Burkes = playdate.graphics.image.kDitherTypeBurkes
____exports.PlaydateDitherType[____exports.PlaydateDitherType.Burkes] = "Burkes"
____exports.PlaydateDitherType.Atkinson = playdate.graphics.image.kDitherTypeAtkinson
____exports.PlaydateDitherType[____exports.PlaydateDitherType.Atkinson] = "Atkinson"
____exports.PlaydateLineCapStyle = PlaydateLineCapStyle or ({})
____exports.PlaydateLineCapStyle.Butt = playdate.graphics.kLineCapStyleButt
____exports.PlaydateLineCapStyle[____exports.PlaydateLineCapStyle.Butt] = "Butt"
____exports.PlaydateLineCapStyle.Square = playdate.graphics.kLineCapStyleSquare
____exports.PlaydateLineCapStyle[____exports.PlaydateLineCapStyle.Square] = "Square"
____exports.PlaydateLineCapStyle.Round = playdate.graphics.kLineCapStyleRound
____exports.PlaydateLineCapStyle[____exports.PlaydateLineCapStyle.Round] = "Round"
____exports.PlaydateDrawMode = PlaydateDrawMode or ({})
____exports.PlaydateDrawMode.Copy = playdate.graphics.kDrawModeCopy
____exports.PlaydateDrawMode[____exports.PlaydateDrawMode.Copy] = "Copy"
____exports.PlaydateDrawMode.WhiteTransparent = playdate.graphics.kDrawModeWhiteTransparent
____exports.PlaydateDrawMode[____exports.PlaydateDrawMode.WhiteTransparent] = "WhiteTransparent"
____exports.PlaydateDrawMode.BlackTransparent = playdate.graphics.kDrawModeBlackTransparent
____exports.PlaydateDrawMode[____exports.PlaydateDrawMode.BlackTransparent] = "BlackTransparent"
____exports.PlaydateDrawMode.FillWhite = playdate.graphics.kDrawModeFillWhite
____exports.PlaydateDrawMode[____exports.PlaydateDrawMode.FillWhite] = "FillWhite"
____exports.PlaydateDrawMode.FillBlack = playdate.graphics.kDrawModeFillBlack
____exports.PlaydateDrawMode[____exports.PlaydateDrawMode.FillBlack] = "FillBlack"
____exports.PlaydateDrawMode.XOR = playdate.graphics.kDrawModeXOR
____exports.PlaydateDrawMode[____exports.PlaydateDrawMode.XOR] = "XOR"
____exports.PlaydateDrawMode.NXOR = playdate.graphics.kDrawModeNXOR
____exports.PlaydateDrawMode[____exports.PlaydateDrawMode.NXOR] = "NXOR"
____exports.PlaydateDrawMode.Inverted = playdate.graphics.kDrawModeInverted
____exports.PlaydateDrawMode[____exports.PlaydateDrawMode.Inverted] = "Inverted"
____exports.PlaydateStrokeLocation = PlaydateStrokeLocation or ({})
____exports.PlaydateStrokeLocation.Centered = playdate.graphics.kStrokeCentered
____exports.PlaydateStrokeLocation[____exports.PlaydateStrokeLocation.Centered] = "Centered"
____exports.PlaydateStrokeLocation.Inside = playdate.graphics.kStrokeInside
____exports.PlaydateStrokeLocation[____exports.PlaydateStrokeLocation.Inside] = "Inside"
____exports.PlaydateStrokeLocation.Outside = playdate.graphics.kStrokeOutside
____exports.PlaydateStrokeLocation[____exports.PlaydateStrokeLocation.Outside] = "Outside"
____exports.PlaydateFontVariant = PlaydateFontVariant or ({})
____exports.PlaydateFontVariant.Normal = playdate.graphics.font.kVariantNormal
____exports.PlaydateFontVariant[____exports.PlaydateFontVariant.Normal] = "Normal"
____exports.PlaydateFontVariant.Bold = playdate.graphics.font.kVariantBold
____exports.PlaydateFontVariant[____exports.PlaydateFontVariant.Bold] = "Bold"
____exports.PlaydateFontVariant.Italic = playdate.graphics.font.kVariantItalic
____exports.PlaydateFontVariant[____exports.PlaydateFontVariant.Italic] = "Italic"
____exports.PlaydateTextAlignment = PlaydateTextAlignment or ({})
____exports.PlaydateTextAlignment.Left = playdate.graphics.kAlignLeft
____exports.PlaydateTextAlignment[____exports.PlaydateTextAlignment.Left] = "Left"
____exports.PlaydateTextAlignment.Right = playdate.graphics.kAlignRight
____exports.PlaydateTextAlignment[____exports.PlaydateTextAlignment.Right] = "Right"
____exports.PlaydateTextAlignment.Center = playdate.graphics.kAlignCenter
____exports.PlaydateTextAlignment[____exports.PlaydateTextAlignment.Center] = "Center"
____exports.PlaydateCollisionResponse = PlaydateCollisionResponse or ({})
____exports.PlaydateCollisionResponse.Slide = playdate.graphics.sprite.kCollisionTypeSlide
____exports.PlaydateCollisionResponse[____exports.PlaydateCollisionResponse.Slide] = "Slide"
____exports.PlaydateCollisionResponse.Freeze = playdate.graphics.sprite.kCollisionTypeFreeze
____exports.PlaydateCollisionResponse[____exports.PlaydateCollisionResponse.Freeze] = "Freeze"
____exports.PlaydateCollisionResponse.Overlap = playdate.graphics.sprite.kCollisionTypeOverlap
____exports.PlaydateCollisionResponse[____exports.PlaydateCollisionResponse.Overlap] = "Overlap"
____exports.PlaydateCollisionResponse.Bounce = playdate.graphics.sprite.kCollisionTypeBounce
____exports.PlaydateCollisionResponse[____exports.PlaydateCollisionResponse.Bounce] = "Bounce"
____exports.PlaydateCapitalizationBehavior = PlaydateCapitalizationBehavior or ({})
____exports.PlaydateCapitalizationBehavior.Normal = playdate.keyboard.kCapitalizationNormal
____exports.PlaydateCapitalizationBehavior[____exports.PlaydateCapitalizationBehavior.Normal] = "Normal"
____exports.PlaydateCapitalizationBehavior.Words = playdate.keyboard.kCapitalizationWords
____exports.PlaydateCapitalizationBehavior[____exports.PlaydateCapitalizationBehavior.Words] = "Words"
____exports.PlaydateCapitalizationBehavior.Sentences = playdate.keyboard.kCapitalizationSentences
____exports.PlaydateCapitalizationBehavior[____exports.PlaydateCapitalizationBehavior.Sentences] = "Sentences"
____exports.PlaydateSoundFormat = PlaydateSoundFormat or ({})
____exports.PlaydateSoundFormat["8bitMono"] = playdate.sound.kFormat8bitMono
____exports.PlaydateSoundFormat[____exports.PlaydateSoundFormat["8bitMono"]] = "8bitMono"
____exports.PlaydateSoundFormat["8bitStereo"] = playdate.sound.kFormat8bitStereo
____exports.PlaydateSoundFormat[____exports.PlaydateSoundFormat["8bitStereo"]] = "8bitStereo"
____exports.PlaydateSoundFormat["16bitMono"] = playdate.sound.kFormat16bitMono
____exports.PlaydateSoundFormat[____exports.PlaydateSoundFormat["16bitMono"]] = "16bitMono"
____exports.PlaydateSoundFormat["16bitStereo"] = playdate.sound.kFormat16bitStereo
____exports.PlaydateSoundFormat[____exports.PlaydateSoundFormat["16bitStereo"]] = "16bitStereo"
____exports.PlaydateSoundWave = PlaydateSoundWave or ({})
____exports.PlaydateSoundWave.Square = playdate.sound.kWaveSquare
____exports.PlaydateSoundWave[____exports.PlaydateSoundWave.Square] = "Square"
____exports.PlaydateSoundWave.Triangle = playdate.sound.kWaveTriangle
____exports.PlaydateSoundWave[____exports.PlaydateSoundWave.Triangle] = "Triangle"
____exports.PlaydateSoundWave.Sine = playdate.sound.kWaveSine
____exports.PlaydateSoundWave[____exports.PlaydateSoundWave.Sine] = "Sine"
____exports.PlaydateSoundWave.Noise = playdate.sound.kWaveNoise
____exports.PlaydateSoundWave[____exports.PlaydateSoundWave.Noise] = "Noise"
____exports.PlaydateSoundWave.Sawtooth = playdate.sound.kWaveSawtooth
____exports.PlaydateSoundWave[____exports.PlaydateSoundWave.Sawtooth] = "Sawtooth"
____exports.PlaydateSoundWave.POPhase = playdate.sound.kWavePOPhase
____exports.PlaydateSoundWave[____exports.PlaydateSoundWave.POPhase] = "POPhase"
____exports.PlaydateSoundWave.PODigital = playdate.sound.kWavePODigital
____exports.PlaydateSoundWave[____exports.PlaydateSoundWave.PODigital] = "PODigital"
____exports.PlaydateSoundWave.POVosim = playdate.sound.kWavePOVosim
____exports.PlaydateSoundWave[____exports.PlaydateSoundWave.POVosim] = "POVosim"
____exports.PlaydateSoundLfoType = PlaydateSoundLfoType or ({})
____exports.PlaydateSoundLfoType.Square = playdate.sound.kLFOSquare
____exports.PlaydateSoundLfoType[____exports.PlaydateSoundLfoType.Square] = "Square"
____exports.PlaydateSoundLfoType.Triangle = playdate.sound.kLFOTriangle
____exports.PlaydateSoundLfoType[____exports.PlaydateSoundLfoType.Triangle] = "Triangle"
____exports.PlaydateSoundLfoType.Sine = playdate.sound.kLFOSine
____exports.PlaydateSoundLfoType[____exports.PlaydateSoundLfoType.Sine] = "Sine"
____exports.PlaydateSoundLfoType.SampleAndHold = playdate.sound.kLFOSampleAndHold
____exports.PlaydateSoundLfoType[____exports.PlaydateSoundLfoType.SampleAndHold] = "SampleAndHold"
____exports.PlaydateSoundLfoType.SawtoothUp = playdate.sound.kLFOSawtoothUp
____exports.PlaydateSoundLfoType[____exports.PlaydateSoundLfoType.SawtoothUp] = "SawtoothUp"
____exports.PlaydateSoundLfoType.SawtoothDown = playdate.sound.kLFOSawtoothDown
____exports.PlaydateSoundLfoType[____exports.PlaydateSoundLfoType.SawtoothDown] = "SawtoothDown"
____exports.PlaydateSoundTwoPoleFilterType = PlaydateSoundTwoPoleFilterType or ({})
____exports.PlaydateSoundTwoPoleFilterType.LowPass = playdate.sound.kFilterLowPass
____exports.PlaydateSoundTwoPoleFilterType[____exports.PlaydateSoundTwoPoleFilterType.LowPass] = "LowPass"
____exports.PlaydateSoundTwoPoleFilterType.HighPass = playdate.sound.kFilterHighPass
____exports.PlaydateSoundTwoPoleFilterType[____exports.PlaydateSoundTwoPoleFilterType.HighPass] = "HighPass"
____exports.PlaydateSoundTwoPoleFilterType.BandPass = playdate.sound.kFilterBandPass
____exports.PlaydateSoundTwoPoleFilterType[____exports.PlaydateSoundTwoPoleFilterType.BandPass] = "BandPass"
____exports.PlaydateSoundTwoPoleFilterType.Notch = playdate.sound.kFilterNotch
____exports.PlaydateSoundTwoPoleFilterType[____exports.PlaydateSoundTwoPoleFilterType.Notch] = "Notch"
____exports.PlaydateSoundTwoPoleFilterType.PEQ = playdate.sound.kFilterPEQ
____exports.PlaydateSoundTwoPoleFilterType[____exports.PlaydateSoundTwoPoleFilterType.PEQ] = "PEQ"
____exports.PlaydateSoundTwoPoleFilterType.LowShelf = playdate.sound.kFilterLowShelf
____exports.PlaydateSoundTwoPoleFilterType[____exports.PlaydateSoundTwoPoleFilterType.LowShelf] = "LowShelf"
____exports.PlaydateSoundTwoPoleFilterType.HighShelf = playdate.sound.kFilterHighShelf
____exports.PlaydateSoundTwoPoleFilterType[____exports.PlaydateSoundTwoPoleFilterType.HighShelf] = "HighShelf"
____exports.PlaydateSeekWhence = PlaydateSeekWhence or ({})
____exports.PlaydateSeekWhence.Set = playdate.file.kSeekSet
____exports.PlaydateSeekWhence[____exports.PlaydateSeekWhence.Set] = "Set"
____exports.PlaydateSeekWhence.FromCurrent = playdate.file.kSeekFromCurrent
____exports.PlaydateSeekWhence[____exports.PlaydateSeekWhence.FromCurrent] = "FromCurrent"
____exports.PlaydateSeekWhence.FromEnd = playdate.file.kSeekFromEnd
____exports.PlaydateSeekWhence[____exports.PlaydateSeekWhence.FromEnd] = "FromEnd"
____exports.PlaydateWrapMode = PlaydateWrapMode or ({})
____exports.PlaydateWrapMode.Clip = playdate.graphics.kWrapClip
____exports.PlaydateWrapMode[____exports.PlaydateWrapMode.Clip] = "Clip"
____exports.PlaydateWrapMode.Character = playdate.graphics.kWrapCharacter
____exports.PlaydateWrapMode[____exports.PlaydateWrapMode.Character] = "Character"
____exports.PlaydateWrapMode.Word = playdate.graphics.kWrapWord
____exports.PlaydateWrapMode[____exports.PlaydateWrapMode.Word] = "Word"
____exports.PlaydateNetworkStatus = PlaydateNetworkStatus or ({})
____exports.PlaydateNetworkStatus.NotConnected = playdate.network.kStatusNotConnected
____exports.PlaydateNetworkStatus[____exports.PlaydateNetworkStatus.NotConnected] = "NotConnected"
____exports.PlaydateNetworkStatus.Connected = playdate.network.kStatusConnected
____exports.PlaydateNetworkStatus[____exports.PlaydateNetworkStatus.Connected] = "Connected"
____exports.PlaydateNetworkStatus.NotAvailable = playdate.network.kStatusNotAvailable
____exports.PlaydateNetworkStatus[____exports.PlaydateNetworkStatus.NotAvailable] = "NotAvailable"
local lastTime = -1
local ____playdate_file_modtime_result_0 = playdate.file.modtime("main.pdz")
local second = ____playdate_file_modtime_result_0.second
local minute = ____playdate_file_modtime_result_0.minute
local hour = ____playdate_file_modtime_result_0.hour
local day = ____playdate_file_modtime_result_0.day
local month = ____playdate_file_modtime_result_0.month
local year = ____playdate_file_modtime_result_0.year
____exports.withReload = function(____, update, options)
    local ____temp_1 = options or ({})
    local interval = ____temp_1.interval
    if interval == nil then
        interval = 1000
    end
    return function()
        local elapsedSeconds = math.floor(playdate.getCurrentTimeMilliseconds() / interval)
        if elapsedSeconds ~= lastTime then
            lastTime = elapsedSeconds
            local newTime = playdate.file.modtime("main.pdz")
            if newTime.second ~= second or newTime.minute ~= minute or newTime.hour ~= hour or newTime.day ~= day or newTime.month ~= month or newTime.year ~= year then
                print("Reloading...")
                playdate.file.run("main.pdz")
            end
        end
        update(nil)
    end
end
return ____exports
 end,
["src.renderer.ui"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____state = require("src.state")
local gameState = ____state.gameState
local ____constants = require("src.constants")
local ROWS = ____constants.ROWS
local COLS = ____constants.COLS
local CELL_WIDTH = ____constants.CELL_WIDTH
local CELL_HEIGHT = ____constants.CELL_HEIGHT
local GRID_OFFSET_X = ____constants.GRID_OFFSET_X
local GRID_OFFSET_Y = ____constants.GRID_OFFSET_Y
____exports.UIRenderer = {
    drawStartScreen = function()
        playdate.graphics.drawText("*NAME SORTER*", 145, 60)
        playdate.graphics.drawText("Press A to Start", 135, 100)
        local instructionsY = 140
        local lineHeight = 20
        local leftX = 50
        playdate.graphics.drawText("Controls:", leftX, instructionsY)
        playdate.graphics.drawText("D-Pad: Move Cursor / Shift Row", leftX, instructionsY + lineHeight)
        playdate.graphics.drawText("A: Claim Name", leftX, instructionsY + lineHeight * 2)
        playdate.graphics.drawText("B: Switch Mode (Row/Column)", leftX, instructionsY + lineHeight * 3)
        playdate.graphics.drawText("Crank: Shuffle Line", leftX, instructionsY + lineHeight * 4)
    end,
    drawHUD = function()
        if gameState.gameOver then
            playdate.graphics.drawText("GAME OVER", 150, 100)
            playdate.graphics.drawText(
                "Final Score: " .. tostring(gameState.score),
                140,
                130
            )
            playdate.graphics.drawText("Press A to Restart", 130, 160)
            return
        end
        playdate.graphics.drawText(
            "Score: " .. tostring(gameState.score),
            10,
            10
        )
        playdate.graphics.drawText(
            "Mode: " .. string.upper(gameState.mode),
            10,
            30
        )
        local legendX = 260
        playdate.graphics.drawText("A: Claim Name", legendX, 10)
        playdate.graphics.drawText("B: Switch Mode", legendX, 30)
        local barX = GRID_OFFSET_X
        local barY = GRID_OFFSET_Y + ROWS * CELL_HEIGHT + 25
        local barWidth = COLS * CELL_WIDTH
        local barHeight = 4
        playdate.graphics.drawRect(barX, barY, barWidth, barHeight)
        local fillPercent = gameState.freezeTimer / gameState.freezeThreshold
        local fillWidth = math.floor(barWidth * fillPercent)
        if fillWidth > 0 then
            playdate.graphics.fillRect(barX, barY, fillWidth, barHeight)
        end
    end
}
return ____exports
 end,
["src.renderer.grid"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____core = require("lua_modules.@crankscript.core.src.index")
local PlaydateColor = ____core.PlaydateColor
local ____state = require("src.state")
local gameState = ____state.gameState
local ____constants = require("src.constants")
local ROWS = ____constants.ROWS
local COLS = ____constants.COLS
local CELL_WIDTH = ____constants.CELL_WIDTH
local CELL_HEIGHT = ____constants.CELL_HEIGHT
local GRID_OFFSET_X = ____constants.GRID_OFFSET_X
local GRID_OFFSET_Y = ____constants.GRID_OFFSET_Y
local FROZEN_CELL = ____constants.FROZEN_CELL
local function drawDashedRect(____, x, y, w, h)
    playdate.graphics.setLineWidth(3)
    local dashLen = 5
    local gapLen = 3
    local step = dashLen + gapLen
    do
        local i = 0
        while i < w do
            local segW = math.min(dashLen, w - i)
            playdate.graphics.drawLine(x + i, y, x + i + segW, y)
            playdate.graphics.drawLine(x + i, y + h, x + i + segW, y + h)
            i = i + step
        end
    end
    do
        local i = 0
        while i < h do
            local segH = math.min(dashLen, h - i)
            playdate.graphics.drawLine(x, y + i, x, y + i + segH)
            playdate.graphics.drawLine(x + w, y + i, x + w, y + i + segH)
            i = i + step
        end
    end
    playdate.graphics.setLineWidth(1)
end
____exports.GridRenderer = {drawGrid = function()
    local textOffsetX = math.floor((CELL_WIDTH - 12) / 2)
    local textOffsetY = math.floor((CELL_HEIGHT - 14) / 2)
    local gridW = COLS * CELL_WIDTH
    local gridH = ROWS * CELL_HEIGHT
    playdate.graphics.setClipRect(GRID_OFFSET_X, GRID_OFFSET_Y, gridW, gridH)
    do
        local r = 0
        while r < ROWS do
            local rowOffset = gameState.rowOffsets[r + 1]
            local cellY = GRID_OFFSET_Y + r * CELL_HEIGHT
            local rowData = gameState.grid[r + 1]
            do
                local c = 0
                while c < COLS do
                    local char = rowData[c + 1]
                    local colOffset = gameState.colOffsets[c + 1]
                    local cellX = GRID_OFFSET_X + c * CELL_WIDTH + rowOffset
                    local finalY = cellY + colOffset
                    local function drawCell(____, dx, dy)
                        if char == FROZEN_CELL then
                            playdate.graphics.fillRect(dx + 2, dy + 2, CELL_WIDTH - 4, CELL_HEIGHT - 4)
                        else
                            playdate.graphics.drawText(char, dx + textOffsetX, dy + textOffsetY)
                        end
                    end
                    drawCell(nil, cellX, finalY)
                    if rowOffset < 0 and c == 0 then
                        drawCell(nil, cellX + COLS * CELL_WIDTH, finalY)
                    end
                    if rowOffset > 0 and c == COLS - 1 then
                        drawCell(nil, cellX - COLS * CELL_WIDTH, finalY)
                    end
                    if colOffset < 0 and r == 0 then
                        drawCell(nil, cellX, finalY + ROWS * CELL_HEIGHT)
                    end
                    if colOffset > 0 and r == ROWS - 1 then
                        drawCell(nil, cellX, finalY - ROWS * CELL_HEIGHT)
                    end
                    c = c + 1
                end
            end
            r = r + 1
        end
    end
    playdate.graphics:clearClipRect()
    local ____gameState_0 = gameState
    local mode = ____gameState_0.mode
    local visualCursor = ____gameState_0.visualCursor
    local cursor = ____gameState_0.cursor
    if mode == "row" then
        drawDashedRect(
            nil,
            GRID_OFFSET_X,
            GRID_OFFSET_Y + visualCursor.y * CELL_HEIGHT,
            COLS * CELL_WIDTH,
            CELL_HEIGHT
        )
    elseif mode == "column" then
        drawDashedRect(
            nil,
            GRID_OFFSET_X + visualCursor.x * CELL_WIDTH,
            GRID_OFFSET_Y,
            CELL_WIDTH,
            ROWS * CELL_HEIGHT
        )
    elseif mode == "name" then
        local char = gameState.grid[cursor.y + 1][cursor.x + 1]
        playdate.graphics.setLineWidth(3)
        if char == FROZEN_CELL then
            playdate.graphics.setColor(PlaydateColor.White)
        end
        playdate.graphics.drawRect(GRID_OFFSET_X + visualCursor.x * CELL_WIDTH, GRID_OFFSET_Y + visualCursor.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT)
        if char == FROZEN_CELL then
            playdate.graphics.setColor(PlaydateColor.Black)
        end
        playdate.graphics.setLineWidth(1)
    end
end}
return ____exports
 end,
["src.renderer.index"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____core = require("lua_modules.@crankscript.core.src.index")
local PlaydateColor = ____core.PlaydateColor
local PlaydateDrawMode = ____core.PlaydateDrawMode
local PlaydateFontVariant = ____core.PlaydateFontVariant
local ____state = require("src.state")
local gameState = ____state.gameState
local ____elements = require("src.renderer.elements")
local ElementsRenderer = ____elements.ElementsRenderer
local ____ui = require("src.renderer.ui")
local UIRenderer = ____ui.UIRenderer
local ____grid = require("src.renderer.grid")
local GridRenderer = ____grid.GridRenderer
local ____constants = require("src.constants")
local GRID_OFFSET_X = ____constants.GRID_OFFSET_X
local GRID_OFFSET_Y = ____constants.GRID_OFFSET_Y
local COLS = ____constants.COLS
local ROWS = ____constants.ROWS
local CELL_WIDTH = ____constants.CELL_WIDTH
local CELL_HEIGHT = ____constants.CELL_HEIGHT
____exports.drawGame = function()
    playdate.graphics.clear(PlaydateColor.White)
    playdate.graphics.setColor(PlaydateColor.Black)
    playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillBlack)
    playdate.graphics.setFont(playdate.graphics.getSystemFont(PlaydateFontVariant.Normal))
    if not gameState.started then
        UIRenderer:drawStartScreen()
        return
    end
    UIRenderer:drawHUD()
    for ____, name in ipairs(gameState.detectedNames) do
        ElementsRenderer:drawCapsule(name.drawX, name.drawY, name.drawW, name.drawH)
    end
    local ____gameState_0 = gameState
    local visualCursor = ____gameState_0.visualCursor
    if gameState.mode == "row" or gameState.mode == "name" then
        local cy = GRID_OFFSET_Y + visualCursor.y * CELL_HEIGHT + CELL_HEIGHT / 2
        ElementsRenderer:drawAnimatedCaret(GRID_OFFSET_X - 15, cy, "right")
        ElementsRenderer:drawAnimatedCaret(GRID_OFFSET_X + COLS * CELL_WIDTH + 15, cy, "left")
    end
    if gameState.mode == "column" or gameState.mode == "name" then
        local cx = GRID_OFFSET_X + visualCursor.x * CELL_WIDTH + CELL_WIDTH / 2
        ElementsRenderer:drawAnimatedCaret(cx, GRID_OFFSET_Y - 8, "down")
        ElementsRenderer:drawAnimatedCaret(cx, GRID_OFFSET_Y + ROWS * CELL_HEIGHT + 8, "up")
    end
    GridRenderer:drawGrid()
    playdate.graphics.setColor(PlaydateColor.Black)
    for ____, p in ipairs(gameState.particles) do
        playdate.graphics.fillRect(p.x, p.y, p.size, p.size)
    end
end
return ____exports
 end,
["src.index"] = function(...) 
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____state = require("src.state")
local gameState = ____state.gameState
local ____grid = require("src.grid")
local createInitialGrid = ____grid.createInitialGrid
local ____input = require("src.input")
local inputHandler = ____input.inputHandler
local ____index = require("src.logic.index")
local GameLogic = ____index.GameLogic
local ____index = require("src.renderer.index")
local drawGame = ____index.drawGame
local ____constants = require("src.constants")
local TICK_RATE_MS = ____constants.TICK_RATE_MS
local MAX_ACCUMULATOR_MS = ____constants.MAX_ACCUMULATOR_MS
local CURSOR_LERP_SPEED = ____constants.CURSOR_LERP_SPEED
local ROWS = ____constants.ROWS
local COLS = ____constants.COLS
gameState.grid = createInitialGrid(nil)
GameLogic:recalculateBoldMask()
playdate.inputHandlers.push(inputHandler)
local lastTime = playdate.getCurrentTimeMilliseconds()
local accumulator = 0
local framesThisSecond = 0
local lastFpsTime = lastTime
playdate.update = function()
    local currentTime = playdate.getCurrentTimeMilliseconds()
    local dt = currentTime - lastTime
    lastTime = currentTime
    framesThisSecond = framesThisSecond + 1
    if currentTime - lastFpsTime >= 1000 then
        gameState.fps = framesThisSecond
        framesThisSecond = 0
        lastFpsTime = currentTime
    end
    if dt > 0 then
        gameState.dt = dt
    end
    local lerpFactor = math.min(1, CURSOR_LERP_SPEED * dt)
    local ____gameState_visualCursor_0, ____x_1 = gameState.visualCursor, "x"
    ____gameState_visualCursor_0[____x_1] = ____gameState_visualCursor_0[____x_1] + (gameState.cursor.x - gameState.visualCursor.x) * lerpFactor
    local ____gameState_visualCursor_2, ____y_3 = gameState.visualCursor, "y"
    ____gameState_visualCursor_2[____y_3] = ____gameState_visualCursor_2[____y_3] + (gameState.cursor.y - gameState.visualCursor.y) * lerpFactor
    if math.abs(gameState.cursor.x - gameState.visualCursor.x) < 0.01 then
        gameState.visualCursor.x = gameState.cursor.x
    end
    if math.abs(gameState.cursor.y - gameState.visualCursor.y) < 0.01 then
        gameState.visualCursor.y = gameState.cursor.y
    end
    local slideFactor = math.min(1, lerpFactor * 1.5)
    do
        local r = 0
        while r < ROWS do
            if math.abs(gameState.rowOffsets[r + 1]) > 0.5 then
                local ____gameState_rowOffsets_4, ____temp_5 = gameState.rowOffsets, r + 1
                ____gameState_rowOffsets_4[____temp_5] = ____gameState_rowOffsets_4[____temp_5] + (0 - gameState.rowOffsets[r + 1]) * slideFactor
            else
                gameState.rowOffsets[r + 1] = 0
            end
            r = r + 1
        end
    end
    do
        local c = 0
        while c < COLS do
            if math.abs(gameState.colOffsets[c + 1]) > 0.5 then
                local ____gameState_colOffsets_6, ____temp_7 = gameState.colOffsets, c + 1
                ____gameState_colOffsets_6[____temp_7] = ____gameState_colOffsets_6[____temp_7] + (0 - gameState.colOffsets[c + 1]) * slideFactor
            else
                gameState.colOffsets[c + 1] = 0
            end
            c = c + 1
        end
    end
    accumulator = accumulator + dt
    if accumulator > MAX_ACCUMULATOR_MS then
        accumulator = MAX_ACCUMULATOR_MS
    end
    while accumulator >= TICK_RATE_MS do
        if gameState.started then
            GameLogic:updateFreeze()
            GameLogic:tick()
        end
        accumulator = accumulator - TICK_RATE_MS
    end
    drawGame(nil)
end
return ____exports
 end,
}
return require("src.index", ...)
