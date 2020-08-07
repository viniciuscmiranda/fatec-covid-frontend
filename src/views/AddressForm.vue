<template>
  <main class="addresses">
    <header class="page-header">
      <div class="left">
        <router-link to="/" title="Voltar" class="back">
          <Icon name="arrow-left" />
        </router-link>
        <h2 v-if="address">Editando Endereço</h2>
        <h2 v-else>Cadastrar Endereço</h2>
      </div>
    </header>

    <div class="content">
      <form @submit.prevent="handleSubmit" class="form">
        <label class="input-block" :class="errors.zipcode && 'input-block-error'">
          <input 
            type="text"
            name="zipcode"
            required
            placeholder=" "
            :value="address ? formatCEP(address.zipcode) : ''"
          />
          <span>CEP</span>

          <p class="error" v-if="errors.zipcode">{{errors.zipcode}}</p>
        </label>

        <label class="input-block">
          <input 
            type="text"
            name="street"
            required
            placeholder=" "
            :value="address ? address.street : ''"
          />
          <span>Rua</span>
        </label>

        <label class="input-block">
          <input 
            type="text"
            name="number"
            placeholder=" "
            :value="address ? address.number : ''"
          />
          <span>Número</span>
        </label>

        <label class="input-block">
          <input 
            type="text"
            name="neighborhood"
            required
            placeholder=" "
            :value="address ? address.neighborhood : ''"
          />
          <span>Bairro</span>
        </label>

        <label class="input-block">
          <input 
            type="text"
            name="city"
            required
            placeholder=" "
            :value="address ? address.city : ''"
          />
          <span>Cidade</span>
        </label>

        <label class="input-block">
          <select name="state" required :value="address ? address.state : ''">
            <option value="">Selecionar Estado</option>
            <option :value="state.value" v-for="state in states" :key="state.value">
              {{state.label}}
            </option>
          </select>
          <span>Estado</span>
        </label>

        <label class="input-block">
          <input 
            type="text"
            name="complement"
            placeholder=" "
            :value="address ? address.complement : ''"
          />
          <span>Complemento</span>
        </label>

        <button type="submit" class="button">
          <span>Enviar</span>
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import { address } from '../services/api';
import * as utils from '../utils';
import Icon from '../components/Icon';

export default {
  props: ['address'],
  components: {
    Icon,
  },
  data: () => ({
    errors: {},
    states: utils.states,
  }),
  methods: {
    ...utils.parsers,
    ...utils.formatters,
    ...utils.validations,
    async handleSubmit(event){
      const data = utils.getFormData(event);

      try {
        data.zipcode = this.parseNumber(data.zipcode);
        if(!this.validCEP(data.zipcode)){
          this.errors.zipcode = 'CEP Inválido';
          utils.setLoading(false);
          return;
        }

        if(this.address) {
          utils.setLoading(true, 'Atualizando endereço');
          await address.update(this.address.id, data);
        } else {
          utils.setLoading(true, 'Cadastrando endereço');
          await address.create(this.$route.params.beneficiary_id, data);
        }
      } catch (err) {
        console.warn(err)
      }

      utils.setLoading(false);
      this.$router.back();
    },
  }
}
</script>