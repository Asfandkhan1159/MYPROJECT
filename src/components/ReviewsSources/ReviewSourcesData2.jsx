import TripAdvisorIcon from '../../assets/ReviewsIcons/Group 1000002854.svg'
import GoogleIcon from '../../assets/ReviewsIcons/Group 1000002864.svg'
import DoorDashIcon from '../../assets/ReviewsIcons/Group 1000002857.svg'
import OpenTableIcon from '../../assets/ReviewsIcons/Group 1000002859.svg'
import YelpIcon from '../../assets/ReviewsIcons/Group 1000002866.svg'
import UberEatsIcon from '../../assets/ReviewsIcons/Group 1000002863.svg'
const RandomEntityReviewData = [
    {
      name: 'OpenTable',
      logo: OpenTableIcon,
      rating: 4.2,
      reviews: [
        { text: 'Lovely dining experience with great views.', rating: 4.5, foodRating: 4, serviceRating: 4.5, valueRating: 4, ambianceRating: 5  },
        { text: 'Good food, but service could be improved.', rating: 4 , foodRating: 4.2, serviceRating: 4.3, valueRating: 4.1, ambianceRating: 4  },
        // Add more reviews
      ],
    },
    {
      name: 'Yelp',
      logo: YelpIcon,
      rating: 4.0,
      reviews: [
        { text: 'Nice place, would visit again.', rating: 4, foodRating: 3.8, serviceRating: 4, valueRating: 4, ambianceRating: 4.2 },
        { text: 'Friendly staff and decent food.', rating: 3.5, foodRating: 3.2, serviceRating: 3.8, valueRating: 3.5, ambianceRating: 3.7 },
        // Add more reviews
      ],
    },
    {
      name: 'DoorDash',
      logo: DoorDashIcon,
      rating: 4.3,
      reviews: [
        { text: 'Quick delivery and tasty food!', rating: 4.5, foodRating: 4.2, serviceRating: 4.5, valueRating: 4.3, ambianceRating: 4  },
        { text: 'Variety of choices, but sometimes orders are incorrect.', rating: 3.5, foodRating: 3.5, serviceRating: 3.7, valueRating: 3.8, ambianceRating: 3.5 },
        // Add more reviews
      ],
    },
    {
      name: 'TripAdvisor',
      logo: TripAdvisorIcon,
      rating: 4.4,
      reviews: [
        { text: 'Beautiful location and excellent service.', rating: 5, foodRating: 4.5, serviceRating: 4.7, valueRating: 4.5, ambianceRating: 5  },
        { text: 'One of the best travel destinations.', rating: 4.5, foodRating: 4.2, serviceRating: 4.5, valueRating: 4.3, ambianceRating: 4.8 },
        // Add more reviews
      ],
    },
    {
      name: 'UberEats',
      logo: UberEatsIcon,
      rating: 4.1,
      reviews: [
        { text: 'Delicious meals delivered on time.', rating: 4, foodRating: 4.2, serviceRating: 4, valueRating: 4.1, ambianceRating: 3.9  },
        { text: 'Quality varies, but mostly satisfactory.', rating: 3.5, foodRating: 3.7, serviceRating: 3.5, valueRating: 3.8, ambianceRating: 3.5  },
        // Add more reviews
      ]
      },
      {
        name: 'Google Reviews',
        logo: GoogleIcon,
        rating: 4.5,
        reviews: [
          { text: 'Amazing customer service and product quality.', rating: 5, foodRating: 4.8, serviceRating: 4.9, valueRating: 4.7, ambianceRating: 4.8  },
          { text: 'Great place, highly recommended.', rating: 4.5, foodRating: 4.3, serviceRating: 4.6, valueRating: 4.5, ambianceRating: 4.7  },
          // Add more reviews
        ],
      },
      // Add more review sources for the Random Entity if needed
    ];
    
    export default RandomEntityReviewData;