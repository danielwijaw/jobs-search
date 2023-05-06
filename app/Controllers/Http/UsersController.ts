import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {ResponseProviders} from './../../../providers/ResponseProviders'
import User from 'App/Models/User'
import {LoginSchema, RefreshSchema} from './../../Validator/User.schema'

export default class UsersController {

  public async register(ctx: HttpContextContract) {

    try {

      const countUserAccount = await User.first()
      if(countUserAccount){
        return ctx.response.send(ResponseProviders({
          status: "false",
          message: "Users are created"
        }))
      }

      const UserModels = new User()
      UserModels.username = "Admin"
      UserModels.password = "Admin"
      const UserReturns = await UserModels.save()

      const JwtAccess = await ctx.auth.use("jwt").generate(UserReturns);

      return ctx.response.send(ResponseProviders({data: JwtAccess}))
    } catch (error) {
      return ctx.response.send(ResponseProviders({
        status: "false",
        message: error.message,
        error: error
      }))
    }

  }

  public async login(ctx: HttpContextContract) {

    try {

      const schemaLogin = LoginSchema()
      const payload = await ctx.request.validate({
        schema: schemaLogin
      })

      const attemptLogin = await ctx.auth.use('jwt').attempt(payload.username, payload.password)

      return ctx.response.send(ResponseProviders({data: attemptLogin, message: "Login Success"}))
    } catch (error) {
      return ctx.response.send(ResponseProviders({
        status: "false",
        message: error.message,
        error: error
      }))
    }

  }

  public async logout(ctx: HttpContextContract) {

    try {

      const schemaRefresh = RefreshSchema()
      const payload = await ctx.request.validate({
        schema: schemaRefresh
      })

      const logoutToken = await ctx.auth.use("jwt").logout({refreshToken: payload.refresh_token})

      return ctx.response.send(ResponseProviders({ message: "Success Revoke", data: logoutToken}))
    } catch (error) {
      return ctx.response.send(ResponseProviders({
        status: "false",
        message: error.message,
        error: error
      }))
    }

  }

  public async refreshToken(ctx: HttpContextContract) {

    try {

      const schemaRefresh = RefreshSchema()
      const payload = await ctx.request.validate({
        schema: schemaRefresh
      })

      const refreshToken = await ctx.auth.use("jwt").loginViaRefreshToken(payload.refresh_token);

      return ctx.response.send(ResponseProviders({ message: "Success Refresh Token", data: refreshToken}))
    } catch (error) {
      return ctx.response.send(ResponseProviders({
        status: "false",
        message: error.message,
        error: error
      }))
    }

  }

}
