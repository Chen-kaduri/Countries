document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('country');
  
    if (!countryName) {
      document.getElementById('country-name').innerHTML = '<p>No country selected!</p>';
      return;
    }
  
    fetch('CountriesData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load JSON data');
        }
        return response.json();
      })
      .then(countries => {
        const country = countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
        if (country) {
          const countryDetails = `
            <h2>${country.name}</h2>
            <img src="${country.flag}" alt="${country.name} Flag" style="width: 200px;">
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
          `;

          // remove the loader if the country is found 
        const loader = document.getElementById('loader'); 
        if (loader) {
        loader.style.display = 'none'; 
         }

          document.getElementById('country-name').innerHTML = countryDetails;
        } else {
          document.getElementById('country-name').innerHTML = '<p>Country not found!</p>';
        }
      })
      .catch(error => {
        console.error('Error loading country data:', error);
        document.getElementById('country-name').innerHTML = '<p>Error loading country data!</p>';
      });
  });
  