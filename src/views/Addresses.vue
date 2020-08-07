<template>
  <main class="addresses">
    <header class="page-header">
      <div class="left">
        <router-link to="/" title="Voltar" class="back">
          <Icon name="arrow-left" />
        </router-link>
        <h2>Endereços</h2>
      </div>

      <router-link
        :to="`/${$route.params.beneficiary_id}/address-create`"
        class="button button-light"
      >
        <Icon name="map-marker-plus" />

        <span>Cadastrar Endereço</span>
      </router-link>
    </header>

    <div class="content">
      <div class="data-table">
        <table v-if="addresses.length">
          <thead>
            <th>CEP</th>
            <th>Rua</th>
            <th>Número</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Complemento</th>
            <th>Ações</th>
          </thead>

          <tbody>
            <tr v-for="address in addresses" :key="address.id">
              <td>{{formatCEP(address.zipcode)}}</td>
              <td>{{address.street}}</td>
              <td>{{address.number}}</td>
              <td>{{address.neighborhood}}</td>
              <td>{{address.city}}</td>
              <td>{{address.state}}</td>
              <td>{{address.complement}}</td>
              <td>
                <div class="actions">
                  <button 
                    class="button button-round"
                    @click="() => handleDelete(address.id)"
                    title="Deletar"
                  >
                    <Icon name="delete" />
                  </button>

                  <button 
                    class="button button-round" 
                    @click="() => $router.push({
                      name: 'address-create',
                      params: { address, beneficiary_id: $route.params.beneficiary_id }
                    })"
                    title="Editar"
                  >
                    <Icon name="pencil" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="no-data" v-else>
          Nenhum endereço encontrado
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { address } from '../services/api';
import * as utils from '../utils';
import Icon from '../components/Icon';

export default {
  components: {
    Icon,
  },
  data: () => ({
    addresses: [],
  }),
  methods: {
    ...utils.formatters,
    async getAddresses(){
      utils.setLoading(true, 'Buscando endereços');

      try {
        const data = await address.list(this.$route.params.beneficiary_id);
        this.addresses = data;
      } catch(err) {
        console.warn(err);
      }

      utils.setLoading(false);
    },
    async handleDelete(address_id){
      utils.setLoading(true, 'Deletando endereço');
      try {
        await address.delete(address_id);
        this.addresses = this.addresses.filter(address => 
          address.id !== address_id
        );
      } catch (err) {
        console.warn(err);
      }

      utils.setLoading(false);
    }
  },
  created(){
    this.getAddresses();
  }
}
</script>