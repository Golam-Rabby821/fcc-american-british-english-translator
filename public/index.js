const translateHandler = async () => {
	const textArea = document.getElementById("text-input");
	const localeArea = document.getElementById("locale-select");
	const errorArea = document.getElementById("error-msg");
	const translatedArea = document.getElementById("translated-sentence");

	errorArea.innerText = "";
	errorArea.style.display = "none";
	translatedArea.innerText = "Translating...";
	translatedArea.classList.add("muted");

	try {
		const data = await fetch("/api/translate", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				text: textArea.value,
				locale: localeArea.value,
			}),
		});

		const parsed = await data.json();

		if (parsed.error) {
			errorArea.innerText = JSON.stringify(parsed);
			errorArea.style.display = "block";
			translatedArea.innerText = "Translation failed.";
			return;
		}

		translatedArea.innerHTML = parsed.translation;
		translatedArea.classList.remove("muted");
	} catch (err) {
		errorArea.innerText = "Network error: " + err.message;
		errorArea.style.display = "block";
		translatedArea.innerText = "Translation failed.";
	}
};

document
	.getElementById("translate-btn")
	.addEventListener("click", translateHandler);
