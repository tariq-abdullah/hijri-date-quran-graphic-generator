function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        //time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var app = new Vue({
    el: '#app',
    data: {
        ayah: '1',
        surahsToShow: 1,
        translation: 1,
        location: 'Delhi',
        reference: ' ',
        fordate: '',
        date: '4 April 2022',
        islamicMonth: 'Ramadan',
        islamicDate: '01',
        islamicYear: '1430',
        fajr: '0:0',
        zuhr: '0:0',
        asr: '0:0',
        maghrib: '0:0',
        isha: '0:0',
        sunrise: '0:0',
        sunset: '',
        languagesAvailable: '',
        translationLanguage: '',
        editionIdentifier: 'en.sarwar',
        QuranText: ' ',
        editionsAvailable: [],
        translatedText: '',
        social: 'tariq.social',
        loading: 0,
        day: '01',
        month: 'April',
        year: '2022',
        selectedCity: 'Delhi',
        otherCity: '',
        manualCity: false,
        reference: '2:48',
        locations: [{
                name: "Delhi",
                latlong: ['26.848623', '80.8024271']
            },
            {
                name: "Lucknow",
                latlong: ['28.6466773', '76.813073']
            },
            {
                name: "Azamgarh",
                latlong: ['26.056835', '83.1195258']
            },
            {
                name: "Moradabad",
                latlong: ['28.8431354', '78.697512']
            },
            {
                name: "Madhubani",
                latlong: ['26.3460241', '86.0385828']
            },
            {
                name: "Muzaffarnagar",
                latlong: ['29.4751246', '77.6913482']
            },
            {
                name: "Kolkata",
                latlong: ['22.6757521', '88.0495359']
            },
            {
                name: "Mumbai",
                latlong: ['19.0821978', '72.7410999']
            },
            {
                name: "Badaun",
                latlong: ['28.1871493', '78.5196087']
            },
            {
                name: "Bengalore",
                latlong: ['12.95396', '77.4908529']
            },
            {
                name: "Patna",
                latlong: ['25.6080208', '85.0730026']
            },
            {
                name: "Sri Nagar",
                latlong: ['34.1066986', '74.736715']
            },
            {
                name: "Hyderabad",
                latlong: ['17.4122998', '78.267959']
            },
            {
                name: "Indore",
                latlong: ['22.7239575', '75.7938095']
            },
            {
                name: "Ahmadabad",
                latlong: ['23.0201818', '72.4396566']
            },

            {
                name: "Нұр-сұлтан",
                latlong: ['51.1480774', '71.339307']
            }

        ],
        latlong: {
            name: "Delhi",
            latlong: ['26.848623', '80.8024271']
        },
        calculationMethod: 7,
        showForDate: '2022-04-03',
        monthName: 'April',
        background: '8.jpeg',
        backgrounds: [
            '1.jpeg',
            '2.jpeg',
            '3.jpeg',
            '4.jpeg',
            '5.jpeg',
            '6.jpeg',
            '7.jpeg',
            '8.jpeg',
            '9.jpeg',
            '10.jpeg',
            '11.jpeg',
            '12.jpeg',
            '13.jpeg',
            '14.jpeg',
            '15.jpeg',
            '16.jpeg',
            '17.jpeg',
            '18.jpeg',
            '19.jpeg',
            '20.jpeg',
            '21.jpeg',
            '22.jpeg',
            '23.jpeg',
            '24.jpeg',
            '25.jpeg',
            '26.jpeg',
            '27.jpeg',
            '28.jpeg',
            '28.jpeg',
            '29.jpeg',
            '30.jpeg'
        ]
    },
    methods: {

        seekEditions: function(event) {

            this.loading = 1;

            console.log(this.translationLanguage);

            axios.get('https://api.alquran.cloud/v1/edition/language/' + this.translationLanguage)
                .then(function(response) {
                    // handle success
                    //console.log(response.data.data);
                    app.editionsAvailable = [];
                    response.data.data.forEach(function(element, index, array) {
                        app.editionsAvailable.push(element)
                    });
                    // console.log(app.editionsAvailable);
                    app.loading = 0;
                });


        },
        seekByReference: function() {

        },

        seekLanguages: function(event) {

            console.log(this.languagesAvailable);

            axios.get('https://api.alquran.cloud/v1/edition/language')
                .then(function(response) {
                    console.log(response.data.data);
                    app.languagesAvailable = response.data.data;
                });


        },
        changeBackground: function() {

            this.background = this.backgrounds[getRandomInt(1, 30)];


        },
        updateQuran: function(event) {

            this.loading = 1;
            axios.get('https://api.alquran.cloud/v1/ayah/' + this.reference + '/editions/quran-uthmani,' + this.editionIdentifier).then(function(response) {

                app.QuranText = response.data.data[0].text + " ۝ ";
                app.translatedText = response.data.data[1].text;
                //show reference only on the last line
                app.reference = response.data.data[1].surah.number + ":" + response.data.data[1].numberInSurah;
                app.loading = 0;

            });
        },
        changeAyah: function(e) {
            this.loading = 1;
            this.ayah = getRandomInt(1, 6000);
            axios.get('https://api.alquran.cloud/v1/ayah/' + this.ayah + '/editions/quran-uthmani,' + this.editionIdentifier).then(function(response) {
                app.QuranText = response.data.data[0].text + " ۝ ";
                app.translatedText = response.data.data[1].text;
                app.reference = response.data.data[1].surah.number + ":" + response.data.data[1].numberInSurah;
                app.loading = 0;
            });
        },
        updateCity: function(e) {

            var id = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            this.selectedCity = name;
            this.updateTimings();
            if (this.selectedCity == "Select Other") {
                this.selectedCity == "";
                this.manualCity = true
            }

        },
        updateTimings: function() {

            this.loading = 1;

            var d = new Date(this.showForDate);
            console.log(this.showForDate);
            var month = d.getMonth() + 1;
            var year = d.getFullYear();
            var day = d.getDate();


            var position = this.latlong;

            var latitude = this.latlong[0];
            var longitude = this.latlong[1];

            app.monthName = monthNames[d.getMonth()];

            app.day = day;
            app.month = month;
            app.year = year;

            console.log('https://api.aladhan.com/v1/calendar?latitude=' + latitude + '&longitude=' + longitude + '&method=2&school=1&month=' + month + '&year=' + year + '&method=' + this.calculationMethod);

            axios.get('https://api.aladhan.com/v1/calendar?latitude=' + latitude + '&longitude=' + longitude + '&method=2&school=1&month=' + month + '&year=' + year + '&method=' + this.calculationMethod)
                .then(function(response) {
                    // handle success
                    console.log(response.data);
                    var arrayIndex = day - 1;
                    app.fajr = response.data.data[arrayIndex].timings.Fajr.toString().replace("(IST)", '');
                    app.zuhr = response.data.data[arrayIndex].timings.Dhuhr.toString().replace("(IST)", '');
                    app.asr = response.data.data[arrayIndex].timings.Asr.toString().replace("(IST)", '');
                    app.maghrib = response.data.data[arrayIndex].timings.Maghrib.toString().replace("(IST)", '');
                    app.isha = response.data.data[arrayIndex].timings.Isha.toString().replace("(IST)", '');
                    app.sunrise = response.data.data[arrayIndex].timings.Sunrise.toString().replace("(IST)", '');
                    app.sunset = response.data.data[arrayIndex].timings.toString().replace("(IST)", '');


                    ///islamic months and dates


                    app.islamicDate = response.data.data[arrayIndex].date.hijri.day;
                    app.islamicMonth = response.data.data[arrayIndex].date.hijri.month.en;
                    app.islamicYear = response.data.data[arrayIndex].date.hijri.year;

                    app.loading = false;

                    console.log("calcculation methd" + app.calculationMethod);


                });
        }
    },
    mounted() {

        /**** for date */ //

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        ////  end date */


        this.showForDate = yyyy + '-' + mm + '-' + dd;
        // console.log("today is "+this.showForDate)
        this.translationLanguage = 'en';
        this.seekLanguages();
        this.seekEditions();
        this.ayah = getRandomInt(1, 6236);
        this.surahsToShow = getRandomInt(1, 10);

        this.updateQuran();
        this.changeAyah();
        this.updateTimings();
        this.changeBackground();

    },
    updated() {}
});


/////////////////////////////////////////

function downloadimage() {
    app.loading = 1;
    //var container = document.getElementById("image-wrap"); //specific element on page
    var container = document.getElementById("downloadable");; // full page 
    html2canvas(container, {
        allowTaint: true
    }).then(function(canvas) {

        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "Tariqs-Namaz-Timer.jpg";
        link.href = canvas.toDataURL();
        link.target = '_blank';
        link.click();
        app.loading = 0;
    });
}