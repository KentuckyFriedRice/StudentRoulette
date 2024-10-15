let array = [];
    let selected = [];
    let removed = [];
    let arrayLength = 23;
    let count = 23;
    let numCSS = '';

    

    function printArray() {
        const arrayContainer = document.getElementById('array-container');
    
        // Clear the array container
        arrayContainer.innerHTML = '';

        // Loop through the array and create elements for each number
        for (let i = 0; i < array.length; i++) {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('number');
            numberDiv.textContent = array[i];
	        numberDiv.setAttribute('style', numCSS+'cursor:pointer;');

            // Add click event to remove the clicked number
            numberDiv.onclick = function() {
                removed.push(array[i]); // Add to removed array
                array = array.filter(num => !removed.includes(num)); // Filter out removed numbers
                selected = selected.filter(num => !removed.includes(num)); // Filter out from selected as well
                printArray();
                printSelected();
            };

            arrayContainer.appendChild(numberDiv);
        }
    }


    function printSelected() {
        const arrayContainer = document.getElementById('selectedList');
        const arrayContainer2 = document.getElementById('selectedList2');
    
        const selectedSorted = selected.slice(); // Make a copy for sorting
    
        // Clear the containers
        arrayContainer.innerHTML = '';
        arrayContainer2.innerHTML = '';

        // Display the original selected list
        for (let i = 0; i < selected.length; i++) {
            const numberDiv1 = document.createElement('div');
            numberDiv1.classList.add('number');
            numberDiv1.textContent = selected[i];

            numberDiv1.onclick = function() {
                removed.push(selected[i]); // Add to removed array
                array = array.filter(num => !removed.includes(num)); // Filter out removed numbers
                selected = selected.filter(num => !removed.includes(num)); // Filter out from selected as well
                printArray();
                printSelected();
            };

            arrayContainer.appendChild(numberDiv1);

            const numberDiv2 = document.createElement('div');
            numberDiv2.classList.add('number');
            numberDiv2.textContent = selected[i];
            arrayContainer2.appendChild(numberDiv2);
        }

        // Sort and display the selected list in sorted order
        const selectedContainer = document.getElementById('selectedListSorted');
        const selectedContainer2 = document.getElementById('selectedListSorted2');
    
        selectedContainer.innerHTML = '';
        selectedContainer2.innerHTML = '';

        selectedSorted.sort((a, b) => a - b);
    
        for (let i = 0; i < selectedSorted.length; i++) {
            const sortedDiv1 = document.createElement('div');
            sortedDiv1.classList.add('number');
            sortedDiv1.textContent = selectedSorted[i];

            const sortedDiv2 = document.createElement('div');
            sortedDiv2.classList.add('number');
            sortedDiv2.textContent = selectedSorted[i];
        
            selectedContainer.appendChild(sortedDiv1);
            selectedContainer2.appendChild(sortedDiv2);
        }
    }



    function addNumber() {
        let nextNumber = array.length ? array[array.length - 1] + 1 : 1;

        // Skip any numbers that are in the removed array
        while (removed.includes(nextNumber)) {
            nextNumber++;
        }

        array.push(nextNumber);
        arrayLength++;
        printArray();
    }


    function removeNumber() {
        while (array.length > 0) {
            const numberToRemove = array.pop();
            arrayLength--;

            // Skip removed numbers
            if (!removed.includes(numberToRemove)) {
                break; // Stop as soon as a non-removed number is found and removed
            }
        }
        printArray();
    }


    function resetArray() {
        array = [];
        selected = [];

        // Set arrayLength back to the original total count (e.g., 23, if that's the intended reset count)
        const originalCount = 23; // Replace 23 with your initial full range count
        arrayLength = originalCount;

        // Re-initialize the array, excluding numbers in 'removed'
        for (let i = 1; i <= arrayLength; i++) {
            if (!removed.includes(i)) {
                array.push(i);
            }
        }

        printArray(); // Re-display the array after resetting
        printSelected();
    }


    function imitateSpin() {
        if (array.length > 0) {
            const randomIndex = Math.floor(Math.random() * array.length);
            const randomNumber = array[randomIndex];
            document.getElementById('random-number').textContent = `Lucky Number: ${randomNumber}`;
        }
    }

    function fakeSpin() {
        for (let i = 0; i < 10; i++) {
            setTimeout(imitateSpin, i * 100);
        }
    }

    function spin() {
        fakeSpin();

        setTimeout(() => {
            if (array.length > 0) {
                const randomIndex = Math.floor(Math.random() * array.length);
                const randomNumber = array[randomIndex];
                document.getElementById('random-number').textContent = `Lucky Number: ${randomNumber}`;
                
		// Add to selected array
		selected.push(array[randomIndex]);

                // Remove the selected number from the array
		array.splice(randomIndex, 1);
		
                printArray();
		printSelected();
            } else {
                document.getElementById('random-number').textContent = 'No Students';
            }
        }, 1000);
    }

    //Get Current Day and month and return the season
    var months = ["xxx","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function getMMDD() {
        const dateObj = new Date();
        const month   = dateObj.getUTCMonth() + 1; // months from 1-12
        const day     = dateObj.getUTCDate();

        const newDate = month + day;

        // Using padded values, so that 2023/1/7 becomes 2023/01/07
        const pMonth        = month.toString().padStart(2,"0");
        const pDay          = day.toString().padStart(2,"0");
        const newPaddedDate = pMonth+pDay;
	console.log(newPaddedDate);
	
        return newPaddedDate;
    }  

    function findSeason() {
        let d = getMMDD();
        if (d < "0320") {return "winter";}
        if (d < "0621") {return "spring";}
        if (d < "0921") {return "summer";}
        if (d < "1222") {return "autumn";}
        return "winter";
    }

    // Initialize the array with 23 items and print it
    window.onload = function() {
    // Initialize the array with numbers from 1 to arrayLength
    for (let i = 1; i <= arrayLength; i++) {
        // Only add numbers that are not in the removed array
        if (!removed.includes(i)) {
            array.push(i);
        }
    }

    document.getElementById('random-number').textContent = 'Lucky Number: ';
    
    //defines season to change css to appropriate theme
    let season = findSeason();
    console.log(season);    

    document.getElementById('seasonCSS').href = "style/" + season + ".css"; //sets the link to the css file

    switch (season) {
    case "autumn":
        numCSS = 'color:white;text-shadow:1px 1px black;';
        document.getElementById('spinner').src="style/images/pumpkin.png";
        document.getElementById('ad').innerHTML='<a href="https://www.vecteezy.com/free-vector/thanksgiving"><p>Thanksgiving Vectors by Vecteezy</p></a>';
        printArray(); // Display the filtered array
        break;
    case "winter":
        numCSS = 'color:white;text-shadow:1px 1px black;'; 
        document.getElementById('spinner').src="style/images/ornament.png";
        document.getElementById('ad').innerHTML='<a href="https://www.vecteezy.com/free-vector/christmas"><p>Christmas Vectors by Vecteezy</p></a>';
        printArray(); // Display the filtered array
        break;
    case "spring":
        printArray(); // Display the filtered array
        break;
    case "summer":
        printArray(); // Display the filtered array
        break;
    default:
        printArray(); // Display the filtered array
        break;
    }
}
