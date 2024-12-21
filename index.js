fetch('CountriesData.json')
    .then((response) => response.json())
    .then((countries) => {
        const countriesContainer = document.getElementById('countries-g');
        if (!countriesContainer) {
            console.error('countries-g container not found in the DOM!');
            return;
        }

        // global veraible
        let allCountries = countries;

        // view the countries
        function displayCountries(countriesToDisplay) {
                countriesContainer.innerHTML = ''; // Cleaning all the current HTML in the div
                countriesToDisplay.forEach((country) => {
                    const countryDiv = document.createElement('div');
                    countryDiv.className = 'country';
            
                    const countryLink = document.createElement('a');
                    countryLink.href = `details.html?country=${country.name}`;
                    countryDiv.appendChild(countryLink);
            
                    const countryflagDiv = document.createElement('div');
                    countryflagDiv.className = 'country-flag';
            
                    const imgFlag = document.createElement('img');
                    imgFlag.src = `${country.flag}`;
                    imgFlag.alt = `${country.name}`;
                    countryflagDiv.appendChild(imgFlag);
                    countryLink.appendChild(countryflagDiv);

                    const countryInfo = document.createElement('div');
        countryInfo.className = 'country-info';

        const countryH = document.createElement('h2');
        countryH.textContent = `${country.name}`;
        countryInfo.appendChild(countryH);

        const countryPopulation = document.createElement('p');
        const strongP = document.createElement('strong');
        strongP.textContent = 'Population: ';
        countryPopulation.appendChild(strongP);
        countryPopulation.appendChild(document.createTextNode(country.population));
        countryInfo.appendChild(countryPopulation);

        const countryRegion = document.createElement('p');
        const strongR = document.createElement('strong');
        strongR.textContent = 'Region: ';
        countryRegion.appendChild(strongR);
        countryRegion.appendChild(document.createTextNode(country.region));
        countryInfo.appendChild(countryRegion);

        const countryCapital = document.createElement('p');
        const strongC = document.createElement('strong');
        strongC.textContent = 'Capital: ';
        countryCapital.appendChild(strongC);
        countryCapital.appendChild(document.createTextNode(country.capital));
        countryInfo.appendChild(countryCapital);

        countryDiv.appendChild(countryInfo);
        countriesContainer.appendChild(countryDiv);
    });
}
            

        displayCountries(allCountries);

        // filter by region
        const filterItems = document.querySelectorAll('#dropdown-wrapper ul li');
        filterItems.forEach((item) => {
            item.addEventListener('click', () => {
                const region = item.getAttribute('data-region');

                let filteredCountries;
                if (region === 'all') {
                    filteredCountries = allCountries; // כל המדינות
                } else {
                    filteredCountries = allCountries.filter((country) => {
                        return country.region.toLowerCase() === region;
                    });
                }

                // the output
                if (filteredCountries.length === 0) {
                    countriesContainer.innerHTML = '<p>No countries found.</p>';
                } else {
                    displayCountries(filteredCountries);
                }

                // close the menu after the choice
                document.getElementById('dropdown-wrapper').classList.remove('open');
            });
        });
    })
    .catch((error) => {
        console.error('Error loading the JSON data:', error);
    });

// open the menu of the filter
document.addEventListener('DOMContentLoaded', function () {
    const dropdownHeader = document.getElementById('dropdown-header');
    const dropdownWrapper = document.getElementById('dropdown-wrapper');

    dropdownHeader.addEventListener('click', function () {
        dropdownWrapper.classList.toggle('open');
    });
});