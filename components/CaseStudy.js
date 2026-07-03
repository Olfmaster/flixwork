import CaseStudyBody from "./CaseStudyBody";

// Eigenständige Case-Study-Sektion (Startseite, Logistik, Industrie). Der Inhalt
// steckt in CaseStudyBody, damit er auch in der Tab-Ansicht (CaseStudyTabs)
// wiederverwendet werden kann.
export default function CaseStudy({ cs, id }) {
  return (
    <section id={id} className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <CaseStudyBody cs={cs} />
      </div>
    </section>
  );
}
