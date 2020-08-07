<template>
  <main class="beneficiaries">
    <header class="page-header">
      <h2>Beneficiários</h2>

      <router-link
        to="beneficiary-create"
        class="button button-light"
      >
        <Icon name="account-plus" />

        <span>Cadastrar Beneficiário</span>
      </router-link>
    </header>

    <div class="content">
      <div class="data-table">
        <table v-if="beneficiaries.length">
          <thead>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Nascimento</th>
            <th>Ações</th>
          </thead>

          <tbody>
            <tr v-for="beneficiary in beneficiaries" :key="beneficiary.id">
              <td>{{beneficiary.name}}</td>
              <td>{{formatCPF(beneficiary.cpf)}}</td>
              <td>{{formatPhone(beneficiary.phone_number)}}</td>
              <td>{{beneficiary.birthday | moment('DD/MM/YYYY')}}</td>
              <td>
                <div class="actions">
                  <router-link
                    :to="`${beneficiary.id}/addresses`" 
                    class="button button-round"
                    title="Recibos" 
                  >
                    <Icon name="map-marker"  />
                  </router-link>

                  <router-link 
                    :to="`${beneficiary.id}/receipts`" 
                    class="button button-round"
                    title="Recibos" 
                  >
                    <Icon name="receipt" />
                  </router-link>

                  <button 
                    class="button button-round"
                    @click="() => handleDelete(beneficiary.id)"
                    title="Deletar"
                  >
                    <Icon name="delete" />
                  </button>

                  <button 
                    class="button button-round" 
                    @click="() => $router.push({
                      name: 'beneficiary-create',
                      params: { beneficiary }
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
          Nenhum beneficiário encontrado
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { beneficiary } from '../services/api';
import * as utils from '../utils';
import Icon from '../components/Icon';

export default {
  components: {
    Icon,
  },
  data: () => ({
    beneficiaries: [],
  }),
  methods: {
    ...utils.formatters,
    async getBeneficiaries(){
      utils.setLoading(true, 'Buscando beneficiários');

      try {
        const data = await beneficiary.list();
        this.beneficiaries = data;
      } catch(err) {
        console.warn(err);
      }

      utils.setLoading(false);
    },
    async handleDelete(beneficiary_id){
      utils.setLoading(true, 'Deletando Beneficiário');
      try {
        await beneficiary.delete(beneficiary_id);
        this.beneficiaries = this.beneficiaries.filter(beneficiary => 
          beneficiary.id !== beneficiary_id
        );
      } catch (err) {
        console.warn(err);
      }

      utils.setLoading(false);
    }
  },
  created(){
    this.getBeneficiaries();
  }
}
</script>