import axios from 'axios'

class Job {

  private urlServicesCompress:string

  constructor() {
    this.urlServicesCompress = "http://dev3.dansmultipro.co.id/api/recruitment/"
  }

  async JobsIndex(params:object){
    const getImages = await axios.get(this.urlServicesCompress + "positions.json", {params});
    return getImages.data
  }

  async JobsRow(idJobs:string){
    const getImages = await axios.get(this.urlServicesCompress + "positions/" + idJobs);
    return getImages.data
  }

}

export = Job
