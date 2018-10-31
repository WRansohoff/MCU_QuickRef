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
  -- lol
  return "TODO"
end)

return app
