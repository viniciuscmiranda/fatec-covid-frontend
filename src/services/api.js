import { request } from './config';

class Beneficiary {
  model = 'beneficiaries';

  list(){
    return request({
      url: `${this.model}`
    })
  }

  create(data){
    return request({
      method: 'post',
      url: `${this.model}`,
      data
    }) 
  }

  update(id, data){
    return request({
      method: 'patch',
      url: `${this.model}/${id}`,
      data
    }) 
  }

  delete(id) {
    return request({
      method: 'delete',
      url: `${this.model}/${id}`,
    })
  }
} 
export const beneficiary = new Beneficiary();

class Receipt {
  model = 'receipts';

  list(beneficiary_id) {
    return request({
      url: `${beneficiary.model}/${beneficiary_id}/${this.model}`
    })
  }

  create(beneficiary_id, data) {
    return request({
      method: 'post',
      url: `${beneficiary.model}/${beneficiary_id}/${this.model}`,
      data
    })
  }

  update(id, data) {
    return request({
      method: 'patch',
      url: `${this.model}/${id}`,
      data
    })
  }

  delete(id) {
    return request({
      method: 'delete',
      url: `${this.model}/${id}`,
    })
  }
} 
export const receipt = new Receipt();

class Address {
  model = 'addresses';

  list(beneficiary_id) {
    return request({
      url: `${beneficiary.model}/${beneficiary_id}/${this.model}`
    })
  }

  create(beneficiary_id, data) {
    return request({
      method: 'post',
      url: `${beneficiary.model}/${beneficiary_id}/${this.model}`,
      data
    })
  }

  update(id, data) {
    return request({
      method: 'patch',
      url: `${this.model}/${id}`,
      data
    })
  }

  delete(id) {
    return request({
      method: 'delete',
      url: `${this.model}/${id}`,
    })
  }
}

export const address = new Address();