import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {ResponseProviders} from './../../../providers/ResponseProviders'
import JobService from './../../Service/Job.service'

export default class JobController {
  public async index(ctx: HttpContextContract) {

    try {

      let paramsGet = ctx.request.qs()

      if(paramsGet){
        for(let keyIn in paramsGet){
          paramsGet[keyIn] = paramsGet[keyIn].toLowerCase()
        }
      }

      const Jobs = new JobService
      const listJobs = await Jobs.JobsIndex(paramsGet)

      return ctx.response.status(200).send(ResponseProviders({
        message: "Success Get Jobs List",
        data: listJobs
      }))
    } catch (error) {
      return ctx.response.send(ResponseProviders({
        status: "false",
        message: error.message,
        error: error
      }))
    }

  }

  public async row(ctx: HttpContextContract) {

    try {

      const paramsId = ctx.params.id

      const Jobs = new JobService
      const listJobs = await Jobs.JobsRow(paramsId)

      return ctx.response.status(200).send(ResponseProviders({
        message: "Success Get Jobs Row",
        data: listJobs
      }))
    } catch (error) {
      return ctx.response.send(ResponseProviders({
        status: "false",
        message: error.message,
        error: error
      }))
    }

  }

}
