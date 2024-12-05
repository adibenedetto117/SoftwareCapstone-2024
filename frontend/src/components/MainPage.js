// src/components/MainPage.js
import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  text-align: center;
  padding: 40px;
`;

const HeroSection = styled.div`
  background-color: #f4f4f9;
  padding: 60px 20px;
  margin-bottom: 40px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: #264653;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: #2a9d8f;
  margin-bottom: 20px;
`;

const ImagePlaceholder = styled.img`
  width: 80%;
  height: auto;
  border-radius: 10px;
  margin: 20px 0 40px 0;
  object-fit: cover;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #1d3557;
  margin-top: 40px;
`;

const ContentParagraph = styled.p`
  font-size: 1.2rem;
  color: #333;
  text-align: left;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 20px auto;
`;

const InfoList = styled.ul`
  text-align: left;
  max-width: 800px;
  margin: 20px auto;
  list-style-type: square;
`;

const InfoListItem = styled.li`
  font-size: 1.2rem;
  color: #1d3557;
  margin-bottom: 10px;
`;

const MainPage = () => {
  return (
    <MainContainer>
      <HeroSection>
        <HeroTitle>Welcome to TriGear</HeroTitle>
        <HeroSubtitle>Your ultimate guide for Triathlon and Ironman competitions</HeroSubtitle>
        <ImagePlaceholder
          src="https://images.squarespace-cdn.com/content/v1/61b7d0c4c5a10d1c445590cf/1639436551704-BT7W6EV3J6LRPR2VZL21/Drew+Placid+Finish+Hero.jpeg?format=1500w"
          alt="Triathlon Hero Image"
        />
      </HeroSection>

      <SectionTitle>The History of Triathlon and Ironman</SectionTitle>
      <ContentParagraph>
        The sport of triathlon emerged in the 1970s in Southern California and has grown into one of the most challenging endurance events. It combines three sports—swimming, cycling, and running—into a single race. The first official Ironman Triathlon, held in 1978 in Hawaii, included a 2.4-mile swim, a 112-mile bike ride, and a marathon run of 26.2 miles.
      </ContentParagraph>
      <ContentParagraph>
        Today, triathlons are held worldwide, with distances ranging from Sprint to full Ironman races. Triathlon is now an Olympic sport, growing in popularity among all age groups and abilities.
      </ContentParagraph>

      <ImagePlaceholder
        src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/34705/images/Vt9lOElaRmum3AkvGvuu_brief_hisotry_blog.png"
        alt="Triathlon History Image"
      />

      <SectionTitle>Beginner Advice: How to Get Started</SectionTitle>
      <ContentParagraph>
        Starting your triathlon journey can feel daunting, but it doesn’t have to be. Follow these steps to ease into the sport:
      </ContentParagraph>
      <InfoList>
        <InfoListItem><strong>Start Small:</strong> Begin with a sprint triathlon or shorter distance.</InfoListItem>
        <InfoListItem><strong>Training Plan:</strong> Balance your training across swimming, biking, and running.</InfoListItem>
        <InfoListItem><strong>Get the Right Gear:</strong> Invest in basic quality gear like a road bike, running shoes, and a tri-suit.</InfoListItem>
        <InfoListItem><strong>Practice Transitions:</strong> Get efficient with the transitions between each discipline.</InfoListItem>
        <InfoListItem><strong>Join a Community:</strong> Find local groups or online forums for support and motivation.</InfoListItem>
      </InfoList>

      <SectionTitle>Common Misconceptions About Triathlon</SectionTitle>
      <ContentParagraph>
        Several myths surround triathlons, especially for beginners. Let’s debunk a few:
      </ContentParagraph>
      <InfoList>
        <InfoListItem><strong>"You need a top-tier bike to compete":</strong> A decent road bike is sufficient for starters.</InfoListItem>
        <InfoListItem><strong>"Triathletes are superhumans":</strong> Triathlons are for everyone, regardless of fitness level.</InfoListItem>
        <InfoListItem><strong>"You need to be an expert in all three sports":</strong> Many triathletes excel in one discipline and improve others over time.</InfoListItem>
      </InfoList>

      <ImagePlaceholder
        src="https://websitedevsa.blob.core.windows.net/sitefinity/images/default-source/events/2021-open-water-nationals/genericopenwater885x544.jpg?sfvrsn=5e093732_0&size=1220"
        alt="Common Misconceptions Image"
      />

      <SectionTitle>Essential Gear You Need on Race Day</SectionTitle>
      <ContentParagraph>
        Race day can be exciting and nerve-wracking. Use this checklist to stay prepared:
      </ContentParagraph>
      <InfoList>
        <InfoListItem><strong>Triathlon Suit:</strong> For comfort and efficiency across all disciplines.</InfoListItem>
        <InfoListItem><strong>Bike:</strong> A reliable road or triathlon bike with a helmet.</InfoListItem>
        <InfoListItem><strong>Running Shoes:</strong> Ensure your shoes are comfortable and broken in.</InfoListItem>
        <InfoListItem><strong>Swimming Gear:</strong> Include goggles, swim cap, and wetsuit if needed.</InfoListItem>
        <InfoListItem><strong>Hydration & Nutrition:</strong> Bring energy gels, water, and electrolytes.</InfoListItem>
        <InfoListItem><strong>Sunglasses & Hat:</strong> Protect yourself during the bike and run stages.</InfoListItem>
      </InfoList>

      <ImagePlaceholder
        src="https://mytriworld.com/wp-content/uploads/2022/04/Triathlon-gear-clement.jpg"
        alt="Race Day Essentials Image"
      />

      <SectionTitle>Get Inspired!</SectionTitle>
      <ContentParagraph>
        Every triathlete has a unique story, but they all share one goal: crossing the finish line. Watch highlights of Ironman and triathlon races worldwide for motivation.
      </ContentParagraph>

      <ImagePlaceholder
        src="https://upload.wikimedia.org/wikipedia/commons/5/59/Stefan_Lind_-_Ironman_70.3_Budapest_-_2014.08.23_%287%29.JPG"
        alt="Inspiration Video Placeholder"
      />

      <SectionTitle>Join the Community</SectionTitle>
      <ContentParagraph>
        Triathlon isn’t just a sport—it’s a vibrant community. No matter your skill level, there’s always someone to train with, race against, or learn from. Start your journey today!
      </ContentParagraph>
    </MainContainer>
  );
};

export default MainPage;
