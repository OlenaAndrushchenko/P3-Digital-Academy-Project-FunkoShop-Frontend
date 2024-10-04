<script setup>
import { useAuthStore } from '@/stores/auth';
import { ProfileStore } from '@/stores/Profile/ProfileStore';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ref } from 'vue';
import ChangePasswordForm from './ChangePasswordForm.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const openChangePassword = ref(false)

const TIME_DISMISSED = import.meta.env.VITE_TIME_DISMISSED
const store = ProfileStore()
const auth = useAuthStore()

const firstName = ref('');
const lastName = ref('');
const street = ref('');
const city = ref('');
const region = ref('');
const postalCode = ref('');
const country = ref('');

const address = ref(null);
const subscribed = ref(false);
const shipping = ref(false);

const countryCode = ref('+34');
const rigthNumber = ref('');

const textAlert = ref("")

async function setProfile() {
    const response = await store.setProfile(firstName.value, lastName.value, (countryCode.value + '-' + rigthNumber.value), street.value, city.value, region.value, postalCode.value, country.value, address.value, subscribed.value, shipping.value, auth.user.access_token);

    if (response.user == auth.user.id)
        textAlert.value = 'Profile updated successfully';
    else
        textAlert.value = 'Error updating profile';

    setTimeout(() => {
        textAlert.value = '';
    }, TIME_DISMISSED);
}

async function getProfile() {
    const response = await store.getProfile(auth.user.access_token);

    if (response.phoneNumber) {
        const splitPjoneNumber = response.phoneNumber.split('-');
        const countryCodeResponse = splitPjoneNumber[0];
        const rigthNumberResponse = splitPjoneNumber[1];
        rigthNumber.value = rigthNumberResponse;
        countryCode.value = countryCodeResponse;
    }
    firstName.value = response.firstName;
    lastName.value = response.lastName;
    street.value = response.street;
    city.value = response.city;
    region.value = response.region;
    postalCode.value = response.postalCode;
    if (response.country)
        country.value = response.country;
    else
        country.value = 'ES';
    address.value = response.address;
    subscribed.value = response.subscribed;
    shipping.value = response.shipping;
}

getProfile()

</script>

<template>
    <form class="w-full max-w-2xl px-4 py-8 mx-auto" @submit.prevent="setProfile">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">{{ t('profile.personalInformation') }}</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">{{ t('profile.usePermanentAddress') }}</p>

                <div v-if="textAlert != ''"
                    :class="textAlert == 'Profile updated successfully' ? 'bg-green-500' : 'bg-red-500'"
                    class="mt-4 font-regular relative block w-full rounded-lg p-4 text-base leading-5 text-white opacity-100"
                    data-dismissible="alert">
                    <div class="mr-12">{{ textAlert }}</div>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="col-span-6 sm:col-span-3">
                        <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900">{{ t('profile.firstName') }}</label>
                        <div class="mt-2">
                            <input v-model="firstName" type="text" name="firstname" id="firstname"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">{{ t('profile.lastName') }}</label>
                        <div class="mt-2">
                            <input v-model="lastName" type="text" name="lastname" id="lastname"
                                autocomplete="family-name"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                        <label for="countryCode" class="block text-sm font-medium leading-6 text-gray-900">{{ t('profile.countryCode') }}</label>
                        <div class="mt-2">
                            <select v-model="countryCode" id="countryCode"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="+1">+1 (Estados Unidos, Canadá)</option>
                                <option value="+7">+7 (Rusia, Kazajistán)</option>
                                <option value="+20">+20 (Egipto)</option>
                                <option value="+27">+27 (Sudáfrica)</option>
                                <option value="+30">+30 (Grecia)</option>
                                <option value="+31">+31 (Países Bajos)</option>
                                <option value="+32">+32 (Bélgica)</option>
                                <option value="+33">+33 (Francia)</option>
                                <option value="+34">+34 (España)</option>
                                <option value="+36">+36 (Hungría)</option>
                                <option value="+39">+39 (Italia)</option>
                                <option value="+40">+40 (Rumanía)</option>
                                <option value="+41">+41 (Suiza)</option>
                                <option value="+43">+43 (Austria)</option>
                                <option value="+44">+44 (Reino Unido)</option>
                                <option value="+45">+45 (Dinamarca)</option>
                                <option value="+46">+46 (Suecia)</option>
                                <option value="+47">+47 (Noruega)</option>
                                <option value="+48">+48 (Polonia)</option>
                                <option value="+49">+49 (Alemania)</option>
                                <option value="+51">+51 (Perú)</option>
                                <option value="+52">+52 (México)</option>
                                <option value="+53">+53 (Cuba)</option>
                                <option value="+54">+54 (Argentina)</option>
                                <option value="+55">+55 (Brasil)</option>
                                <option value="+56">+56 (Chile)</option>
                                <option value="+57">+57 (Colombia)</option>
                                <option value="+58">+58 (Venezuela)</option>
                                <option value="+60">+60 (Malasia)</option>
                                <option value="+61">+61 (Australia)</option>
                                <option value="+62">+62 (Indonesia)</option>
                                <option value="+63">+63 (Filipinas)</option>
                                <option value="+64">+64 (Nueva Zelanda)</option>
                                <option value="+65">+65 (Singapur)</option>
                                <option value="+66">+66 (Tailandia)</option>
                                <option value="+81">+81 (Japón)</option>
                                <option value="+82">+82 (Corea del Sur)</option>
                                <option value="+84">+84 (Vietnam)</option>
                                <option value="+86">+86 (China)</option>
                                <option value="+90">+90 (Turquía)</option>
                                <option value="+91">+91 (India)</option>
                                <option value="+92">+92 (Pakistán)</option>
                                <option value="+93">+93 (Afganistán)</option>
                                <option value="+94">+94 (Sri Lanka)</option>
                                <option value="+95">+95 (Myanmar)</option>
                                <option value="+98">+98 (Irán)</option>
                                <option value="+211">+211 (Sudán del Sur)</option>
                                <option value="+212">+212 (Marruecos)</option>
                                <option value="+213">+213 (Argelia)</option>
                                <option value="+216">+216 (Túnez)</option>
                                <option value="+218">+218 (Libia)</option>
                                <option value="+220">+220 (Gambia)</option>
                                <option value="+221">+221 (Senegal)</option>
                                <option value="+222">+222 (Mauritania)</option>
                                <option value="+223">+223 (Mali)</option>
                                <option value="+224">+224 (Guinea)</option>
                                <option value="+225">+225 (Costa de Marfil)</option>
                                <option value="+226">+226 (Burkina Faso)</option>
                                <option value="+227">+227 (Níger)</option>
                                <option value="+228">+228 (Togo)</option>
                                <option value="+229">+229 (Benín)</option>
                                <option value="+230">+230 (Mauricio)</option>
                                <option value="+231">+231 (Liberia)</option>
                                <option value="+232">+232 (Sierra Leona)</option>
                                <option value="+233">+233 (Ghana)</option>
                                <option value="+234">+234 (Nigeria)</option>
                                <option value="+235">+235 (Chad)</option>
                                <option value="+236">+236 (República Centroafricana)</option>
                                <option value="+237">+237 (Camerún)</option>
                                <option value="+238">+238 (Cabo Verde)</option>
                                <option value="+239">+239 (Santo Tomé y Príncipe)</option>
                                <option value="+240">+240 (Guinea Ecuatorial)</option>
                                <option value="+241">+241 (Gabón)</option>
                                <option value="+242">+242 (República del Congo)</option>
                                <option value="+243">+243 (República Democrática del Congo)</option>
                                <option value="+244">+244 (Angola)</option>
                                <option value="+245">+245 (Guinea-Bisáu)</option>
                                <option value="+246">+246 (Territorio Británico del Océano Índico)</option>
                                <option value="+248">+248 (Seychelles)</option>
                                <option value="+249">+249 (Sudán)</option>
                                <option value="+250">+250 (Ruanda)</option>
                                <option value="+251">+251 (Etiopía)</option>
                                <option value="+252">+252 (Somalia)</option>
                                <option value="+253">+253 (Yibuti)</option>
                                <option value="+254">+254 (Kenia)</option>
                                <option value="+255">+255 (Tanzania)</option>
                                <option value="+256">+256 (Uganda)</option>
                                <option value="+257">+257 (Burundi)</option>
                                <option value="+258">+258 (Mozambique)</option>
                                <option value="+260">+260 (Zambia)</option>
                                <option value="+261">+261 (Madagascar)</option>
                                <option value="+262">+262 (Reunión, Mayotte)</option>
                                <option value="+263">+263 (Zimbabue)</option>
                                <option value="+264">+264 (Namibia)</option>
                                <option value="+265">+265 (Malaui)</option>
                                <option value="+266">+266 (Lesoto)</option>
                                <option value="+267">+267 (Botsuana)</option>
                                <option value="+268">+268 (Suazilandia)</option>
                                <option value="+269">+269 (Comoras)</option>
                                <option value="+290">+290 (Santa Elena)</option>
                                <option value="+291">+291 (Eritrea)</option>
                                <option value="+297">+297 (Aruba)</option>
                                <option value="+298">+298 (Islas Feroe)</option>
                                <option value="+299">+299 (Groenlandia)</option>
                                <option value="+350">+350 (Gibraltar)</option>
                                <option value="+351">+351 (Portugal)</option>
                                <option value="+352">+352 (Luxemburgo)</option>
                                <option value="+353">+353 (Irlanda)</option>
                                <option value="+354">+354 (Islandia)</option>
                                <option value="+355">+355 (Albania)</option>
                                <option value="+356">+356 (Malta)</option>
                                <option value="+357">+357 (Chipre)</option>
                                <option value="+358">+358 (Finlandia)</option>
                                <option value="+359">+359 (Bulgaria)</option>
                                <option value="+370">+370 (Lituania)</option>
                                <option value="+371">+371 (Letonia)</option>
                                <option value="+372">+372 (Estonia)</option>
                                <option value="+373">+373 (Moldavia)</option>
                                <option value="+374">+374 (Armenia)</option>
                                <option value="+375">+375 (Bielorrusia)</option>
                                <option value="+376">+376 (Andorra)</option>
                                <option value="+377">+377 (Mónaco)</option>
                                <option value="+378">+378 (San Marino)</option>
                                <option value="+379">+379 (Ciudad del Vaticano)</option>
                                <option value="+380">+380 (Ucrania)</option>
                                <option value="+381">+381 (Serbia)</option>
                                <option value="+382">+382 (Montenegro)</option>
                                <option value="+383">+383 (Kosovo)</option>
                                <option value="+385">+385 (Croacia)</option>
                                <option value="+386">+386 (Eslovenia)</option>
                                <option value="+387">+387 (Bosnia y Herzegovina)</option>
                                <option value="+389">+389 (Macedonia del Norte)</option>
                                <option value="+420">+420 (República Checa)</option>
                                <option value="+421">+421 (Eslovaquia)</option>
                                <option value="+423">+423 (Liechtenstein)</option>
                                <option value="+500">+500 (Islas Malvinas)</option>
                                <option value="+501">+501 (Belice)</option>
                                <option value="+502">+502 (Guatemala)</option>
                                <option value="+503">+503 (El Salvador)</option>
                                <option value="+504">+504 (Honduras)</option>
                                <option value="+505">+505 (Nicaragua)</option>
                                <option value="+506">+506 (Costa Rica)</option>
                                <option value="+507">+507 (Panamá)</option>
                                <option value="+508">+508 (San Pedro y Miquelón)</option>
                                <option value="+509">+509 (Haití)</option>
                                <option value="+590">+590 (Guadalupe)</option>
                                <option value="+591">+591 (Bolivia)</option>
                                <option value="+592">+592 (Guyana)</option>
                                <option value="+593">+593 (Ecuador)</option>
                                <option value="+594">+594 (Guayana Francesa)</option>
                                <option value="+595">+595 (Paraguay)</option>
                                <option value="+596">+596 (Martinica)</option>
                                <option value="+597">+597 (Surinam)</option>
                                <option value="+598">+598 (Uruguay)</option>
                                <option value="+599">+599 (Antillas Neerlandesas)</option>

                            </select>
                        </div>
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                        <label for="rigthnumber" class="block text-sm font-medium leading-6 text-gray-900">{{ t('profile.phoneNumber') }}</label>
                        <div class="mt-2">
                            <input v-model="rigthNumber" type="number" name="rigthnumber" id="rigthnumber"
                                autocomplete="family-name"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                        <label for="country" class="block text-sm font-medium leading-6 text-gray-900">{{ t('profile.country') }}</label>
                        <div class="mt-2">
                            <select v-model="country" id="country"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="MX">Mexico</option>
                                <option value="AR">Argentina</option>
                                <option value="BR">Brazil</option>
                                <option value="CL">Chile</option>
                                <option value="CO">Colombia</option>
                                <option value="VE">Venezuela</option>
                                <option value="PE">Peru</option>
                                <option value="EC">Ecuador</option>
                                <option value="UY">Uruguay</option>
                                <option value="PY">Paraguay</option>
                                <option value="BO">Bolivia</option>
                                <option value="GY">Guyana</option>
                                <option value="SR">Suriname</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                                <option value="ES">Spain</option>
                                <option value="IT">Italy</option>
                                <option value="GB">United Kingdom</option>
                                <option value="PT">Portugal</option>
                                <option value="NL">Netherlands</option>
                                <option value="BE">Belgium</option>
                                <option value="CH">Switzerland</option>
                                <option value="AT">Austria</option>
                                <option value="SE">Sweden</option>
                                <option value="NO">Norway</option>
                                <option value="DK">Denmark</option>
                                <option value="FI">Finland</option>
                                <option value="RU">Russia</option>
                                <option value="CN">China</option>
                                <option value="JP">Japan</option>
                                <option value="KR">South Korea</option>
                                <option value="IN">India</option>
                                <option value="AU">Australia</option>
                                <option value="NZ">New Zealand</option>
                                <option value="ZA">South Africa</option>
                                <option value="EG">Egypt</option>
                                <option value="NG">Nigeria</option>
                                <option value="KE">Kenya</option>
                                <option value="MA">Morocco</option>
                                <option value="DZ">Algeria</option>
                                <option value="TN">Tunisia</option>
                                <option value="IL">Israel</option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="TR">Turkey</option>
                                <option value="PK">Pakistan</option>
                                <option value="ID">Indonesia</option>
                                <option value="MY">Malaysia</option>
                                <option value="PH">Philippines</option>
                                <option value="SG">Singapore</option>
                                <option value="TH">Thailand</option>
                                <option value="VN">Vietnam</option>
                                <option value="IR">Iran</option>
                                <option value="IQ">Iraq</option>
                                <option value="AF">Afghanistan</option>
                                <option value="KR">South Korea</option>
                                <option value="BD">Bangladesh</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="MM">Myanmar</option>
                                <option value="KH">Cambodia</option>
                                <option value="LA">Laos</option>
                                <option value="MN">Mongolia</option>
                                <option value="KP">North Korea</option>
                                <option value="NZ">New Zealand</option>
                                <option value="PG">Papua New Guinea</option>
                                <option value="FJ">Fiji</option>
                                <option value="WS">Samoa</option>
                                <option value="TO">Tonga</option>
                                <option value="VU">Vanuatu</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                        <label for="city" class="block text-sm font-medium leading-6 text-gray-900">{{ t('profile.city') }}</label>
                        <div class="mt-2">
                            <input v-model="city" type="text" name="city" id="city" autocomplete="city"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="street" class="block text-sm font-medium leading-6 text-gray-900">{{ t('profile.street') }}</label>
                        <div class="mt-2">
                            <input v-model="street" type="text" name="street" id="street" autocomplete="street"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="region" class="block text-sm font-medium leading-6 text-gray-900">{{ t('profile.region') }}</label>
                        <div class="mt-2">
                            <input v-model="region" type="text" name="region" id="region" autocomplete="region"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="postalcode" class="block text-sm font-medium leading-6 text-gray-900">{{ t('profile.postalCode') }}</label>
                        <div class="mt-2">
                            <input v-model="postalCode" type="text" name="postalcode" id="postalcode"
                                autocomplete="postalcode"
                                class="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="submit" @click="openChangePassword = !openChangePassword"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ t('profile.changePassword') }}</button>
            <TransitionRoot as="template" :show="openChangePassword">
                <Dialog class="relative z-10" @close="openChangePassword = !openChangePassword">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                        enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </TransitionChild>

                    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <TransitionChild as="template" enter="ease-out duration-300"
                                enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                leave-from="opacity-100 translate-y-0 sm:scale-100"
                                leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                <DialogPanel class=" bg-white px-10 shadow-xl transition-all w-full max-w-md rounded-2xl">
                                    <ChangePasswordForm />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </TransitionRoot>
            <button type="submit"
                class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ t('profile.save') }}</button>
        </div>
    </form>
</template>
