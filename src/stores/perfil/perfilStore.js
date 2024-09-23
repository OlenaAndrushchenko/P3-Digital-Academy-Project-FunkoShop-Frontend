import { defineStore } from "pinia";
import { ref } from "vue";
import Perfil from "./Perfil";
import PerfilService from "./PerfilService";


export const perfilStore = defineStore('perfil', () => {

    const perfil = ref(
        {
            id: '',
            firstName : '',
            lastName : '',
            street : '',
            city : '',
            region : '',
            postalCode : '',
            country : '',
            subscribed : false,
            shipping : false,
            address : '',
            phoneNumber : '',
            userAccesToken : ''
        }
    )

    function setPerfil(firstName, lastName, phoneNumber, street, city, region, postalCode, country, address, subscribed, shipping, userAccesToken) {

         const perfil = new Perfil(firstName, lastName, phoneNumber, street, city, region, postalCode, country, address, subscribed, shipping, userAccesToken)
          const service = new PerfilService(perfil)
          return service.setPerfil()

    }

    return { perfil, setPerfil };
});