-- Required Lua/Lapis includes
local bcrypt = require("bcrypt")
local lapis = require("lapis")
local config = require("lapis.config").get()

-- 3rd-party libraries.
local json = require("modules/3p_libs/json/json")

-- Local modules

-- Database models

-- Initial Application setup.
local app = lapis.Application()
app:enable("etlua")
app.layout = require "views.layout_default"

app:get("/", function(self)
  mcu_list    = { }
  stm32_list = { }
  stm32_list["STM32F030F4"] = "Node"
  stm32_list["STM32F031F6"] = "Node"
  stm32_list["STM32F103C8"] = "Node"
  stm32_list["STM32F303K8"] = "Node"
  stm32_list["STM32L432KC"] = "Node"
  mcu_list["STM32"] = stm32_list
  return { render = "index" }
end)

app:get("/mcu_info/:mcu.json", function(self)
  local mcu_file = io.open("mcu_json/" .. self.params.mcu .. ".json", "r")
  local mcu_json = {}
  local mcu_status = 404
  if (mcu_file) then
    mcu_json = json.decode(mcu_file:read("*a"))
    mcu_file:close()
    mcu_status = 200
  end
  return {
    json = mcu_json,
    status = mcu_status
  }
end)

return app
