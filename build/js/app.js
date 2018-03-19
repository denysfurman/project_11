var katoob = new Vue({
	el: '.wrapper__content',
	data: {
		teacherActive: false,
		state: 'Lessons',
		selectedTab: '',
		tabItems: [
			{
				text: 'Lessons'
			},
			{
				text: 'Questions'
			},
			{
				text: 'Forum for the course'
			}
		]
	},
	methods: {
		showTeachers() {
			this.teacherActive = true;
		},
		hideTeachers() {
			this.teacherActive = false; 
		},
		tabsNav(key) {
			this.state = this.tabItems[key].text;
		}
	},
});