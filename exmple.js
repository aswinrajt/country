async function getCountryDetails() {
    const countryName = document.getElementById('countryInput').value.trim();
    
   
    if (!countryName) {
        document.getElementById('countryDetails').innerHTML = '<p>Please enter a country name.</p>';
        return;
    }

    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.status === 404 || !data.length) {
            document.getElementById('countryDetails').innerHTML = '<p>Country not found. Please try again.</p>';
            return;
        }

        const country = data[0];
        const details = `

        <div class="card" style="width: 20rem;">
  <img src="${country.flags?.png}" alt="Flag of ${country.name.common}" class="card-img-top" alt="...">





            <center><h2>${country.name.common}</h2></center>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Subregion:</strong> ${country.subregion}</p>
            <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <p><strong>Currencies:</strong> ${country.currencies ? Object.values(country.currencies).map(curr => curr.name).join(', ') : 'N/A'}</p>
            
        `;
        document.getElementById('countryDetails').innerHTML = details;

    } catch (error) {
        console.error('Error fetching country details:', error);
        document.getElementById('countryDetails').innerHTML = '<p>There was an error retrieving the country details. Please try again later.</p>';
    }
}
