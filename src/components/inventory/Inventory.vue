<template>
  <v-container>
    <h1 class="text-h3 font-weight-black mb-4 mt-9">MY 재고</h1>

    <div class="d-flex justify-end">
    <v-btn size="x-large" class="add-button" >추가</v-btn> </div>
    <v-card>
        <!-- ✅ 테이블 헤더 박스 -->
        <v-sheet
  class="pa-3 mb-1 d-flex justify-center align-center gap-5"
  rounded="lg"
  elevation="2"
  color="#D1D5C2"
>

<div class="d-flex justify-space-between" style="width: 75%;">
    <span class="text-h6 font-weight-bold">이름</span>
   <span class="text-h6 font-weight-bold " >총 수량</span>
  </div>
</v-sheet>


<v-data-table
        :items="inventory"
        :headers="headers"
        item-value="name"
        class="elevation-1"
        hide-default-footer
      >


      

        <template v-slot:expanded-row="{ item }">
          <tr>
            <td colspan="4">
              <v-data-table
                :items="item.details"
                :headers="detailHeaders"
                class="elevation-0"
                hide-default-footer
              >
                <template v-slot:item.price="{ item }">
                  <v-text-field v-if="item.edit" v-model="item.price" dense outlined hide-details></v-text-field>
                  <span v-else>{{ item.price }}원</span>
                </template>
                <template v-slot:item.expiry="{ item }">
                   <v-text-field v-if="item.edit" v-model="item.expiry" dense outlined hide-details></v-text-field>
                  <span v-else>{{ item.expiry }}</span>
                </template>
                <template v-slot:item.amount="{ item }">
                  <v-text-field v-if="item.edit" v-model="item.amount" dense outlined hide-details></v-text-field>
                  <span v-else>{{ item.amount }}</span>
                </template>
                
                <template v-slot:item.actions="{ item }">
                  <v-icon @click="toggleEdit(item)">{{ item.edit ? 'mdi-check' : 'mdi-pencil' }}</v-icon>
                </template>
                
              </v-data-table>
            
            </td>
          </tr>
        </template>
       
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const inventory = ref([
      {
        name: '스파게티면',
        quantity: '3kg',
        details: [
          { price: 2000, expiry: '2025-04-15', amount: '1kg', edit: false },
          { price: 2500, expiry: '2025-04-20', amount: '2kg', edit: false }
        ]
      },
      { name: '감자', quantity: '10kg', details: [] },
      { name: '양파', quantity: '40kg', details: [] }
    ]);

    const headers = [
      { text: '이름', value: 'name' },
      { text: '총 수량', value: 'quantity' },
      { text: '', value: 'data-table-expand' }
    ];
    
    const detailHeaders = ref([
  { title: '단가', key: 'price', sortable: false },
  { title: '유통기한', key: 'expiry', sortable: false },
  { title: '수량', key: 'amount', sortable: false },
  { title: '수정', key: 'actions', align: 'center', sortable: false }
]);



    
    const addItem = () => {
      inventory.value.push({ name: '새 품목', quantity: '1kg', details: [] });
    };

    const toggleEdit = (item) => {
      item.edit = !item.edit;
    };
    
    return { inventory, headers, detailHeaders, addItem, toggleEdit };
  }
};
</script>

<style>
.add-button {
  margin-bottom: 20px; /* 버튼과 텍스트 간격 조정 */
  font-weight: bold !important;
  background-color: #B1D5C2 !important; /* 배경색 설정 */
  color: rgb(0, 0, 0) !important; /* 글자색 설정 */
  border-radius: 15px !important; /* 모서리 둥글게 설정 */
  width: auto !important; /* 버튼 크기 자동 조정 */
  min-width: 100px; /* 최소 너비 설정 */
}

    .v-data-table {
  width: 100%; /* 테이블 너비 고정 */
}

.v-data-table th {
  text-align: center !important; /* 헤더 중앙 정렬 */
}

.v-data-table td {
  text-align: center !important; /* 셀 중앙 정렬 */
}

.detail-table th {
  text-align: center !important;
  width: 33.33%;
}


</style>