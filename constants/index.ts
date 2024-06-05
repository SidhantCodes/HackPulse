export const navlinks = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Organize Hack',
        url: '/hacks/create'
    },
    {
        name: 'My Profile',
        url: '/profile'
    }
]

export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
}

export const selectItems = [
    {
        _id: 'technology-focused',
        name: 'Technology Focused'
    },
    {
        _id: 'industry-specific',
        name: 'Industry Specific'
    },
    {
        _id: 'social-impact',
        name: 'Social Impact'
    },
    {
        _id: 'audience-specific',
        name: 'Audience Specific'
    },
    {
        _id: 'event-style',
        name: 'Event Style'
    },
]