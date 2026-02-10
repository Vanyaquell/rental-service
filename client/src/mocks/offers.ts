import type { FullOffer } from "../types/offers";

const offers: FullOffer[] = [
    {
        'id': 'eee86a0e-3f92-446d-9a6e-cbd4b5d38e2e',
        'title': 'Canal View Houseboat',
        'description': 'Unique houseboat experience with stunning canal views. Authentic Amsterdam living',
        'type': 'house',
        'price': 510,
        'images': [
            '../../public/img/amsterdam/amsterdam-1.jpg',
            '../../public/img/amsterdam/amsterdam-11.jpg',
            '../../public/img/amsterdam/amsterdam-3.jpg',
            '../../public/img/amsterdam/amsterdam-4.jpg',
            '../../public/img/amsterdam/amsterdam-5.jpg',
            '../../public/img/amsterdam/amsterdam-6.jpg',
        ],
        'city': {
            'name': 'Amsterdam',
            'location': {
                'latitude': 52.3676,
                'longitude': 4.9041,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 52.366400,
            'longitude': 4.903050,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Kitchen',
            'Heating',
            'TV',
            'Terrace',
            'Coffee machine',
            'Barbecue',
            'Parking'
        ],
        'host': {
            'isPro': true,
            'name': 'Lucas',
            'avatarUrl': '../../public/img/avatar-lucas.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.8,
        'bedrooms': 2,
        'maxAdults': 4
    },
    {
        'id': 'fff86a0e-3f92-446d-9a6e-cbd4b5d38e2f',
        'title': 'Modern Loft in Amsterdam Center',
        'description': 'Bright and stylish loft with panoramic city views in the heart of Amsterdam',
        'type': 'apartment',
        'price': 420,
        'images': [
            '../../public/img/amsterdam/amsterdam-7.jpg',
            '../../public/img/amsterdam/amsterdam-8.jpg',
            '../../public/img/amsterdam/amsterdam-9.jpg',
        ],
        'city': {
            'name': 'Amsterdam',
            'location': {
                'latitude': 52.3676,
                'longitude': 4.9041,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 52.367563,
            'longitude': 4.900400,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Air conditioning',
            'Kitchen',
            'Washing machine',
            'TV',
            'Elevator',
            'Coffee machine',
            'Iron'
        ],
        'host': {
            'isPro': true,
            'name': 'Maximilian',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.7,
        'bedrooms': 1,
        'maxAdults': 2
    },
    {
        'id': 'eee86a0e-3f92-446d-9a6e-cbd4b5d38e3e',
        'title': 'Cozy Jordaan Apartment',
        'description': 'Charming apartment in the historic Jordaan district',
        'type': 'apartment',
        'price': 350,
        'images': [
            '../../public/img/amsterdam/amsterdam-10.jpg',
            '../../public/img/amsterdam/amsterdam-11.jpg',
        ],
        'city': {
            'name': 'Amsterdam',
            'location': {
                'latitude': 52.3676,
                'longitude': 4.9041,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 52.372000,
            'longitude': 4.880500,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Kitchen',
            'Heating',
            'TV',
            'Coffee machine',
            'Bike rental'
        ],
        'host': {
            'isPro': false,
            'name': 'Emma',
            'avatarUrl': '../../public/img/avatar-angelina.jpg'
        },
        'isPremium': false,
        'isFavorite': true,
        'rating': 4.5,
        'bedrooms': 1,
        'maxAdults': 2
    },
    {
        'id': 'fff86a0e-3f92-446d-9a6e-cbd4b5d38e3f',
        'title': 'Luxury Penthouse with Rooftop',
        'description': 'Exclusive penthouse with private rooftop terrace and city views',
        'type': 'house',
        'price': 890,
        'images': [
            '../../public/img/amsterdam/amsterdam-12.jpg',
            '../../public/img/amsterdam/amsterdam-13.jpg',
        ],
        'city': {
            'name': 'Amsterdam',
            'location': {
                'latitude': 52.3676,
                'longitude': 4.9041,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 52.365200,
            'longitude': 4.890100,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Air conditioning',
            'Kitchen',
            'TV',
            'Elevator',
            'Private terrace',
            'Jacuzzi',
            'Parking',
            'Concierge'
        ],
        'host': {
            'isPro': true,
            'name': 'Alexander',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': true,
        'isFavorite': true,
        'rating': 4.9,
        'bedrooms': 3,
        'maxAdults': 6
    },

    // Paris offers (4 предложения)
    {
        'id': 'bbb86a0e-3f92-446d-9a6e-cbd4b5d38e2b',
        'title': 'Wood and stone place near Eiffel Tower',
        'description': 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families',
        'type': 'apartment',
        'price': 370,
        'images': [
            '../../public/img/paris/paris-1.jpg',
            '../../public/img/paris/paris-2.jpg',
            '../../public/img/paris/paris-3.jpg',
            '../../public/img/paris/paris-4.jpg',
            '../../public/img/paris/paris-5.jpg',
            '../../public/img/paris/paris-6.jpg',
        ],
        'city': {
            'name': 'Paris',
            'location': {
                'latitude': 48.85661,
                'longitude': 2.351499,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 48.858610800000004,
            'longitude': 2.342499,
            'zoom': 16
        },
        'goods': [
            'Heating',
            'Wi-Fi',
            'Fridge',
            'Laptop friendly workspace',
            'Baby seat',
            'Air conditioning',
            'Washer',
            'Towels',
            'Dishwasher',
            'Kitchen',
            'Washing machine',
            'Breakfast',
            'Coffee machine'
        ],
        'host': {
            'isPro': true,
            'name': 'Angelina',
            'avatarUrl': '../../public/img/avatar-angelina.jpg'
        },
        'isPremium': false,
        'isFavorite': true,
        'rating': 4.9,
        'bedrooms': 2,
        'maxAdults': 3,
    },
    {
        'id': 'ggg86a0e-3f92-446d-9a6e-cbd4b5d38e2g',
        'title': 'Charming Parisian Studio',
        'description': 'Beautiful studio in Montmartre with view on Sacré-Cœur',
        'type': 'room',
        'price': 180,
        'images': [
            '../../public/img/paris/paris-7.jpg',
            '../../public/img/paris/paris-8.jpg',
        ],
        'city': {
            'name': 'Paris',
            'location': {
                'latitude': 48.85661,
                'longitude': 2.351499,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 48.886700,
            'longitude': 2.343100,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchenette',
            'Coffee machine',
            'Hair dryer'
        ],
        'host': {
            'isPro': false,
            'name': 'Sophie',
            'avatarUrl': '../../public/img/avatar-sophie.jpg'
        },
        'isPremium': false,
        'isFavorite': false,
        'rating': 4.3,
        'bedrooms': 1,
        'maxAdults': 2
    },
    {
        'id': 'bbb86a0e-3f92-446d-9a6e-cbd4b5d38e3b',
        'title': 'Luxury Loft in Le Marais',
        'description': 'Stylish loft in the trendy Le Marais district',
        'type': 'apartment',
        'price': 520,
        'images': [
            '../../public/img/paris/paris-9.jpg',
            '../../public/img/paris/paris-10.jpg',
        ],
        'city': {
            'name': 'Paris',
            'location': {
                'latitude': 48.85661,
                'longitude': 2.351499,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 48.860200,
            'longitude': 2.362100,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Air conditioning',
            'Kitchen',
            'TV',
            'Washing machine',
            'Elevator',
            'Coffee machine',
            'Bathrobes'
        ],
        'host': {
            'isPro': true,
            'name': 'Pierre',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': true,
        'isFavorite': true,
        'rating': 4.8,
        'bedrooms': 2,
        'maxAdults': 4
    },
    {
        'id': 'ggg86a0e-3f92-446d-9a6e-cbd4b5d38e3g',
        'title': 'Chic Saint-Germain Apartment',
        'description': 'Elegant apartment in the literary and artistic Saint-Germain-des-Prés',
        'type': 'apartment',
        'price': 450,
        'images': [
            '../../public/img/paris/paris-10.jpg',
            '../../public/img/paris/paris-12.jpg',
        ],
        'city': {
            'name': 'Paris',
            'location': {
                'latitude': 48.85661,
                'longitude': 2.351499,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 48.852300,
            'longitude': 2.332800,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchen',
            'TV',
            'Washing machine',
            'Coffee machine',
            'Books library',
            'Piano'
        ],
        'host': {
            'isPro': true,
            'name': 'Claire',
            'avatarUrl': '../../public/img/avatar-angelina.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.7,
        'bedrooms': 2,
        'maxAdults': 3
    },

    // Brussels offers (4 предложения)
    {
        'id': 'hhh86a0e-3f92-446d-9a6e-cbd4b5d38e2h',
        'title': 'Cozy Studio near Grand Place',
        'description': 'Charming studio apartment in the heart of Brussels, just steps away from main attractions',
        'type': 'room',
        'price': 290,
        'images': [
            '../../public/img/brussels/brussels-1.jpg',
            '../../public/img/brussels/brussels-2.jpg',
            '../../public/img/brussels/brussels-3.jpg',
        ],
        'city': {
            'name': 'Brussels',
            'location': {
                'latitude': 50.850346,
                'longitude': 4.351721,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 50.846700,
            'longitude': 4.352500,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchenette',
            'Coffee machine',
            'Hair dryer',
            'Towels'
        ],
        'host': {
            'isPro': false,
            'name': 'Jean',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': false,
        'isFavorite': true,
        'rating': 4.5,
        'bedrooms': 1,
        'maxAdults': 2
    },
    {
        'id': 'hhh86a0e-3f92-446d-9a6e-cbd4b5d38e3h',
        'title': 'Modern Apartment in EU District',
        'description': 'Contemporary apartment close to European institutions',
        'type': 'apartment',
        'price': 380,
        'images': [
            '../../public/img/brussels/brussels-4.jpg',
            '../../public/img/brussels/brussels-5.jpg',
        ],
        'city': {
            'name': 'Brussels',
            'location': {
                'latitude': 50.850346,
                'longitude': 4.351721,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 50.841200,
            'longitude': 4.368900,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Air conditioning',
            'Kitchen',
            'TV',
            'Washing machine',
            'Elevator',
            'Work desk'
        ],
        'host': {
            'isPro': true,
            'name': 'Maria',
            'avatarUrl': '../../public/img/avatar-angelina.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.6,
        'bedrooms': 2,
        'maxAdults': 3
    },
    {
        'id': 'hhh86a0e-3f92-446d-9a6e-cbd4b5d38e4h',
        'title': 'Spacious Family House in Uccle',
        'description': 'Large family house in the green and quiet Uccle district',
        'type': 'house',
        'price': 620,
        'images': [
            '../../public/img/brussels/brussels-7.jpg',
        ],
        'city': {
            'name': 'Brussels',
            'location': {
                'latitude': 50.850346,
                'longitude': 4.351721,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 50.801500,
            'longitude': 4.337800,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchen',
            'TV',
            'Washing machine',
            'Dishwasher',
            'Garden',
            'Parking',
            'Playground'
        ],
        'host': {
            'isPro': true,
            'name': 'Thomas',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': false,
        'isFavorite': true,
        'rating': 4.8,
        'bedrooms': 4,
        'maxAdults': 7
    },
    {
        'id': 'hhh86a0e-3f92-446d-9a6e-cbd4b5d38e5h',
        'title': 'Chic Studio in Sablon',
        'description': 'Elegant studio in the antique district of Sablon',
        'type': 'room',
        'price': 320,
        'images': [
            '../../public/img/brussels/brussels-8.jpg',
            '../../public/img/brussels/brussels-9.jpg',
        ],
        'city': {
            'name': 'Brussels',
            'location': {
                'latitude': 50.850346,
                'longitude': 4.351721,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 50.840100,
            'longitude': 4.356700,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchenette',
            'Coffee machine',
            'TV',
            'Antique furniture'
        ],
        'host': {
            'isPro': false,
            'name': 'Isabelle',
            'avatarUrl': '../../public/img/avatar-angelina.jpg'
        },
        'isPremium': false,
        'isFavorite': false,
        'rating': 4.4,
        'bedrooms': 1,
        'maxAdults': 2
    },

    {
        'id': 'iii86a0e-3f92-446d-9a6e-cbd4b5d38e2i',
        'title': 'Modern Loft in Hamburg Harbor',
        'description': 'Stylish loft with harbor view in the trendy HafenCity district',
        'type': 'apartment',
        'price': 380,
        'images': [
            '../../public/img/hamburg/hamburg-1.jpg',
            '../../public/img/hamburg/hamburg-2.jpg',
            '../../public/img/hamburg/hamburg-3.jpg',
        ],
        'city': {
            'name': 'Hamburg',
            'location': {
                'latitude': 53.551086,
                'longitude': 9.993682,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 53.543800,
            'longitude': 9.991500,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Air conditioning',
            'Kitchen',
            'TV',
            'Washing machine',
            'Coffee machine'
        ],
        'host': {
            'isPro': true,
            'name': 'Klaus',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.6,
        'bedrooms': 2,
        'maxAdults': 3
    },
    {
        'id': 'iii86a0e-3f92-446d-9a6e-cbd4b5d38e3i',
        'title': 'Sternschanze Creative Loft',
        'description': 'Artistic loft in the vibrant Sternschanze neighborhood',
        'type': 'apartment',
        'price': 340,
        'images': [
            '../../public/img/hamburg/hamburg-4.jpg',
            '../../public/img/hamburg/hamburg-5.jpg',
        ],
        'city': {
            'name': 'Hamburg',
            'location': {
                'latitude': 53.551086,
                'longitude': 9.993682,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 53.562300,
            'longitude': 9.962100,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchen',
            'TV',
            'Record player',
            'Art studio',
            'Bicycle'
        ],
        'host': {
            'isPro': true,
            'name': 'Anna',
            'avatarUrl': '../../public/img/avatar-angelina.jpg'
        },
        'isPremium': false,
        'isFavorite': false,
        'rating': 4.7,
        'bedrooms': 1,
        'maxAdults': 2
    },
    {
        'id': 'iii86a0e-3f92-446d-9a6e-cbd4b5d38e4i',
        'title': 'Alster Lake View Apartment',
        'description': 'Beautiful apartment with direct view on the Alster lake',
        'type': 'apartment',
        'price': 520,
        'images': [
            '../../public/img/hamburg/hamburg-15.jpg',
            '../../public/img/hamburg/hamburg-7.jpg',
        ],
        'city': {
            'name': 'Hamburg',
            'location': {
                'latitude': 53.551086,
                'longitude': 9.993682,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 53.558700,
            'longitude': 10.007400,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Air conditioning',
            'Kitchen',
            'TV',
            'Washing machine',
            'Balcony',
            'Lake view',
            'Boat rental'
        ],
        'host': {
            'isPro': true,
            'name': 'Hans',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.9,
        'bedrooms': 3,
        'maxAdults': 5
    },
    {
        'id': 'iii86a0e-3f92-446d-9a6e-cbd4b5d38e5i',
        'title': 'St. Pauli Studio with Harbor View',
        'description': 'Compact studio in the lively St. Pauli district',
        'type': 'room',
        'price': 210,
        'images': [
            '../../public/img/hamburg/hamburg-8.jpg',
            '../../public/img/hamburg/hamburg-9.jpg',
        ],
        'city': {
            'name': 'Hamburg',
            'location': {
                'latitude': 53.551086,
                'longitude': 9.993682,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 53.549800,
            'longitude': 9.967200,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchenette',
            'TV',
            'Coffee machine',
            'Great location'
        ],
        'host': {
            'isPro': false,
            'name': 'Lisa',
            'avatarUrl': '../../public/img/avatar-angelina.jpg'
        },
        'isPremium': false,
        'isFavorite': false,
        'rating': 4.3,
        'bedrooms': 1,
        'maxAdults': 2
    },

    {
        'id': 'jjj86a0e-3f92-446d-9a6e-cbd4b5d38e2j',
        'title': 'Apartment near Cologne Cathedral',
        'description': 'Modern apartment with view on the famous Cologne Cathedral',
        'type': 'apartment',
        'price': 320,
        'images': [
            '../../public/img/cologne/cologne-1.jpg',
            '../../public/img/cologne/cologne-2.jpg',
        ],
        'city': {
            'name': 'Cologne',
            'location': {
                'latitude': 50.937531,
                'longitude': 6.960278,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 50.941200,
            'longitude': 6.958300,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchen',
            'TV',
            'Washing machine'
        ],
        'host': {
            'isPro': true,
            'name': 'Thomas',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': false,
        'isFavorite': false,
        'rating': 4.4,
        'bedrooms': 2,
        'maxAdults': 4
    },
    {
        'id': 'jjj86a0e-3f92-446d-9a6e-cbd4b5d38e3j',
        'title': 'Belgisches Viertel Design Apartment',
        'description': 'Designer apartment in the trendy Belgian Quarter',
        'type': 'apartment',
        'price': 370,
        'images': [
            '../../public/img/cologne/cologne-2.jpg',
            '../../public/img/cologne/cologne-4.jpg',
        ],
        'city': {
            'name': 'Cologne',
            'location': {
                'latitude': 50.937531,
                'longitude': 6.960278,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 50.939500,
            'longitude': 6.947800,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Air conditioning',
            'Kitchen',
            'TV',
            'Washing machine',
            'Design furniture',
            'Balcony'
        ],
        'host': {
            'isPro': true,
            'name': 'Sarah',
            'avatarUrl': '../../public/img/avatar-angelina.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.8,
        'bedrooms': 2,
        'maxAdults': 3
    },
    {
        'id': 'jjj86a0e-3f92-446d-9a6e-cbd4b5d38e4j',
        'title': 'Rhine River Panorama Loft',
        'description': 'Spacious loft with panoramic Rhine river views',
        'type': 'apartment',
        'price': 490,
        'images': [
            '../../public/img/cologne/cologne-5.jpg',
            '../../public/img/cologne/cologne-18.jpg',
        ],
        'city': {
            'name': 'Cologne',
            'location': {
                'latitude': 50.937531,
                'longitude': 6.960278,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 50.933900,
            'longitude': 6.968100,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Air conditioning',
            'Kitchen',
            'TV',
            'Washing machine',
            'Dishwasher',
            'River view',
            'Terrace'
        ],
        'host': {
            'isPro': true,
            'name': 'Michael',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.9,
        'bedrooms': 3,
        'maxAdults': 6
    },
    {
        'id': 'jjj86a0e-3f92-446d-9a6e-cbd4b5d38e5j',
        'title': 'Ehrenfeld Creative Studio',
        'description': 'Creative studio in the artistic Ehrenfeld district',
        'type': 'room',
        'price': 190,
        'images': [
            '../../public/img/cologne/cologne-7.jpg',
            '../../public/img/cologne/cologne-8.jpg',
        ],
        'city': {
            'name': 'Cologne',
            'location': {
                'latitude': 50.937531,
                'longitude': 6.960278,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 50.949200,
            'longitude': 6.924600,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchenette',
            'TV',
            'Art supplies',
            'Bicycle'
        ],
        'host': {
            'isPro': false,
            'name': 'Julia',
            'avatarUrl': '../../public/img/avatar-angelina.jpg'
        },
        'isPremium': false,
        'isFavorite': false,
        'rating': 4.2,
        'bedrooms': 1,
        'maxAdults': 2
    },

    // Dusseldorf offers (4 предложения)
    {
        'id': 'kkk86a0e-3f92-446d-9a6e-cbd4b5d38e2k',
        'title': 'Luxury Apartment in Dusseldorf',
        'description': 'Spacious luxury apartment in the media harbor of Dusseldorf',
        'type': 'apartment',
        'price': 450,
        'images': [
            '../../public/img/dusseldorf/dusseldorf-1.jpg',
            '../../public/img/dusseldorf/dusseldorf-2.jpg',
        ],
        'city': {
            'name': 'Dusseldorf',
            'location': {
                'latitude': 51.227741,
                'longitude': 6.773456,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 51.220200,
            'longitude': 6.771800,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Air conditioning',
            'Kitchen',
            'TV',
            'Washing machine',
            'Dishwasher',
            'Parking'
        ],
        'host': {
            'isPro': true,
            'name': 'Anna',
            'avatarUrl': '../../public/img/avatar-angelina.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.9,
        'bedrooms': 3,
        'maxAdults': 5
    },
    {
        'id': 'kkk86a0e-3f92-446d-9a6e-cbd4b5d38e3k',
        'title': 'Altstadt Traditional Apartment',
        'description': 'Traditional apartment in the historic Old Town',
        'type': 'apartment',
        'price': 290,
        'images': [
            '../../public/img/dusseldorf/dusseldorf-13.jpg',
            '../../public/img/dusseldorf/dusseldorf-4.jpg',
        ],
        'city': {
            'name': 'Dusseldorf',
            'location': {
                'latitude': 51.227741,
                'longitude': 6.773456,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 51.226500,
            'longitude': 6.775200,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchen',
            'TV',
            'Washing machine',
            'Historical charm'
        ],
        'host': {
            'isPro': false,
            'name': 'Markus',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': false,
        'isFavorite': false,
        'rating': 4.5,
        'bedrooms': 2,
        'maxAdults': 3
    },
    {
        'id': 'kkk86a0e-3f92-446d-9a6e-cbd4b5d38e4k',
        'title': 'Königsallee Luxury Penthouse',
        'description': 'Exclusive penthouse on the famous shopping street Königsallee',
        'type': 'apartment',
        'price': 780,
        'images': [
            '../../public/img/dusseldorf/dusseldorf-17.jpg',
            '../../public/img/dusseldorf/dusseldorf-18.jpg',
        ],
        'city': {
            'name': 'Dusseldorf',
            'location': {
                'latitude': 51.227741,
                'longitude': 6.773456,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 51.224800,
            'longitude': 6.780100,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Air conditioning',
            'Kitchen',
            'TV',
            'Washing machine',
            'Dishwasher',
            'Elevator',
            'Private terrace',
            'Concierge',
            'Parking'
        ],
        'host': {
            'isPro': true,
            'name': 'Oliver',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.9,
        'bedrooms': 3,
        'maxAdults': 6
    },
    {
        'id': 'kkk86a0e-3f92-446d-9a6e-cbd4b5d38e5k',
        'title': 'Carlsplatz Market Studio',
        'description': 'Cozy studio overlooking the popular Carlsplatz market',
        'type': 'room',
        'price': 220,
        'images': [
            '../../public/img/dusseldorf/dusseldorf-7.jpg',
            '../../public/img/dusseldorf/dusseldorf-8.jpg',
        ],
        'city': {
            'name': 'Dusseldorf',
            'location': {
                'latitude': 51.227741,
                'longitude': 6.773456,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 51.221600,
            'longitude': 6.778300,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchenette',
            'TV',
            'Coffee machine',
            'Market view'
        ],
        'host': {
            'isPro': false,
            'name': 'Christina',
            'avatarUrl': '../../public/img/avatar-angelina.jpg'
        },
        'isPremium': false,
        'isFavorite': true,
        'rating': 4.6,
        'bedrooms': 1,
        'maxAdults': 2
    }
];

export { offers };