import EmptyTemplate from "../templates/EmptyTemplate";
import { Link } from "react-router-dom";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import "./Home.scss";

const Home = () => {
  return (
    <EmptyTemplate className="homeSection">
      <Header />
      <div className="mainTemplate__container">
        <main className={"mainTemplate__main"}>
          <h1>Appli Chantier</h1>
          <section className="homeSection__first">
            <picture>
              <source
                srcSet="/images/reflective_vest_w300.webp"
                type="image/webp"
                media="(min-width:768px)"
              />
              <source
                srcSet="/images/reflective_vest_w100.webp"
                type="image/webp"
              />
              <img
                src="/images/reflective_vest.png"
                alt="veste reflechissante de chantier"
                className="home_illustration_img"
              />
            </picture>
            <p className="descText">
              La dernière application de gestion dont vous aurez besoin
            </p>
          </section>
          <section>
            <h2>Une interface rapide, simple et intuive</h2>
            <p>
              Inspiré de la restauration ou les contraintes de temps sont
              importantes. Notre système de saisie de devis est conçu pour que
              vous puissiez obtenir le document en un{" "}
              <strong>temps record</strong>. Tout est optimisé pour que vous
              puissiez saisir vos devis tout en faisant votre rendez-vous
              client.
            </p>
          </section>
          <section>
            <h2>Entrez dans l' ère de l' automatisation</h2>
            <p>
              <strong>
                Gagnez du temps grâce à nos fonctionalités d' automatisations
              </strong>
              , envoyez vos devis par e-mail ou dirrectement en courrier postal
              en un simple clic !
            </p>
          </section>
          <section className="homeSection__social">
            <h2>Ils sont entrés dans le futur !</h2>
            <p>Ils utilisent déjà appli chantier, voici leur retour</p>
            <div className="cardsContainer">
              <article>
                <picture>
                  <source
                    srcSet="/images/pierre_macon_w300.webp"
                    type="image/webp"
                    media="(min-width:768px)"
                  />
                  <source
                    srcSet="/images/pierre_macon_w100.webp"
                    type="image/webp"
                  />
                  <img src="/images/pierre_macon.png" className="profile" />
                </picture>
                <blockquote>
                  <p>
                    Mes clients me valident mes devis tant que je suis enccore
                    avec eux et je gagne du temps.
                  </p>
                  <p>
                    <cite>Pierre, Chef d' entreprise de maçonerie</cite>
                  </p>
                </blockquote>
              </article>
              <article>
                <picture>
                  <source
                    srcSet="/images/marc_elec_w300.webp"
                    type="image/webp"
                    media="(min-width:768px)"
                  />
                  <source
                    srcSet="/images/marc_elec_w100.webp"
                    type="image/webp"
                  />
                  <img src="/images/marc_elec.png" className="profile" />
                </picture>
                <blockquote>
                  <p>
                    Je n' ai jamais eu autant de temps libre depuis que j'
                    utilise appli chantier !
                  </p>
                  <p>
                    <cite>Marc, éléctricien autoentrepreneur</cite>
                  </p>
                </blockquote>
              </article>
              <article>
                <picture>
                  <source
                    srcSet="/images/ahmed_jointeur_w300.webp"
                    type="image/webp"
                  />
                  <source
                    srcSet="/images/ahmed_jointeur_w100.webp"
                    type="image/webp"
                  />
                  <img src="/images/ahmed_jointeur.png" className="profile" />
                </picture>
                <blockquote>
                  <p>
                    Depuis que j' utilise appli chantier, j' ai le temps de
                    faire plus de chantiers !
                  </p>
                  <p>
                    <cite>Ahmed, jointeur indépendant</cite>
                  </p>
                </blockquote>
              </article>
            </div>
          </section>
          <section className="homeSection__cta">
            <h2>Essayez dès maintenant</h2>
            <p>Découvrez une nouvelle éfficacité</p>
            <p>Soyez le prochain à booster votre productivité ! </p>
            <Link to="/inscription" className="btn btn-primary btn-cta">
              Essayer
            </Link>
          </section>
        </main>
      </div>
      <Footer />
    </EmptyTemplate>
  );
};
export default Home;
