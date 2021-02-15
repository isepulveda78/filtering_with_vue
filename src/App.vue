<template>
  <div id="main-app" class="container">
    <div class="row justify-content-center">
      <add-appointment @add="addItem"/>
      <search-appointments 
      @searchRecords="searchAppointments" 
      :myKey="filterKey" 
      :myDir="filterDir"
      @requestKey="changeKey"
      @requestDir="changeDir"
      />
      <appointment-list :appointments="filteredApts" @remove="removeItem" @edit="editItem"/>
    </div>
  </div>
</template>

<script>
import AddAppointment from "./components/AddAppointment";
import SearchAppointments from "./components/SearchAppointments";
import AppointmentList from "./components/AppointmentList";
import _ from "lodash";
import axios from "axios";
export default {
  name: "MainApp",
  data: function() {
    return {
      appointments: [
          {
            "petName": "Spot",
            "petOwner": "Constance Smith",
            "aptDate": "2017-07-24 08:30",
            "aptNotes": "This German Shepherd is having some back pain"
          },
          {
            "petName": "Goldie",
            "petOwner": "Barot Bellingham",
            "aptDate": "2017-07-22 15:50",
            "aptNotes": "This Goldfish has some weird spots in the belly"
          },
          {
            "petName": "Mitten",
            "petOwner": "Hillary Goldwyn",
            "aptDate": "2017-07-21 9:15",
            "aptNotes": "Cat has excessive hairballs"
          },
          {
            "petName": "Buffy",
            "petOwner": "Hassum Harrod",
            "aptDate": "2017-07-20 15:30",
            "aptNotes": "This Chihuahua has not eaten for three days and is lethargic"
          }
      ],
      filterKey: "petName",
      filterDir: "asc",
      searchTerms: "",
      aptIndex: 0
    };
  },
  components: {
    AppointmentList,
    SearchAppointments,
    AddAppointment
  },
  // mounted() {
  //   axios.get("./assets/appointments.json").then(
  //     response =>
  //       (this.appointments = response.data.map(item => {
  //         item.aptId = this.aptIndex;
  //         this.aptIndex++;
  //         return item;
  //       }))
  //   );
  // },
  computed: {
    searchedApts: function() {
      return this.appointments.filter(item => {
        return (
          item.petName.toLowerCase().match(this.searchTerms.toLowerCase()) ||
          item.petOwner.toLowerCase().match(this.searchTerms.toLowerCase()) ||
          item.aptNotes.toLowerCase().match(this.searchTerms.toLowerCase())
        );
      });
    },
    filteredApts: function() {
      return _.orderBy(
        this.searchedApts,
        item => {
          return item[this.filterKey].toLowerCase();
        },
        this.filterDir
      );
    }
  },
  methods: {
    changeKey: function(value){
      this.filterKey = value;
    },
    changeDir: function(value){
      this.filterDir = value;
    },
    searchAppointments: function(terms) {
      this.searchTerms = terms;
    },
    addItem: function(apt) {
      apt.aptId = this.aptIndex;
      this.aptIndex++;
      this.appointments.push(apt);
    },
    removeItem: function(apt) {
      this.appointments = _.without(this.appointments, apt);
    },
    editItem: function(id, field, text) {
      const aptIndex = _.findIndex(this.appointments, {
        aptId: id
      });
      this.appointments[aptIndex][field] = text;
    }
  }
};
</script>

