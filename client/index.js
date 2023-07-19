function main() {
	let form = document.querySelector('form')
	form.addEventListener('submit', (e) => {
		e.preventDefault()
		let data = new FormData(e.target)
	})
	handleRange()
}

function handleRange() {
	let isAbs = 1
	let absOrRange = document.querySelector('#switch')
	let range = document.querySelector('#range')
	let absolute = document.querySelector('#absolute')
	range.classList.add('hidden')
	document.querySelector('#min').disabled = isAbs
	document.querySelector('#max').disabled = isAbs
	document.querySelector('#students').disabled = !isAbs
	absOrRange.addEventListener('change', (e) => {
		document.querySelector('#min').disabled = isAbs
		document.querySelector('#max').disabled = isAbs
		document.querySelector('#students').disabled = !isAbs
		isAbs = !isAbs
		if (isAbs) {
			range.classList.add('hidden')
			absolute.classList.remove('hidden')
		}
		else {
			range.classList.remove('hidden')
			absolute.classList.add('hidden')
		}
	})
}

main()
