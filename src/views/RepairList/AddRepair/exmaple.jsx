<div>
      <div className="form-wrapper">
        <h2>Add Repair Part</h2>
        <div className="section-buttons">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`section-button ${sectionIndex === index ? "active" : ""}`}
              onClick={() => toggleSection(index)}
            >
              <div className="section-title">
                {section.name}
                {isSectionFilled(index) && <TickIcon />} {/* Add your tick icon */}
              </div>
            </div>
          ))}
        </div>
        <div className="repair-details-section">
          <form onSubmit={formik.handleSubmit}>
            {/* Conditional rendering based on sectionIndex */}
            {sectionIndex === 0 && (
              <div>
                {/* Render inputs for Repair Details section */}
                {/* ... */}
              </div>
            )}
            {sectionIndex === 1 && (
              <div>
                {/* Render inputs for Non-Maersk Details section */}
                {/* ... */}
              </div>
            )}
            {sectionIndex === 2 && (
              <div>
                {/* Render inputs for Merc+ Details section */}
                {/* ... */}
              </div>
            )}
            <div className="button-container">
              <Button type="primary" onClick={moveToNextSection}>
                Proceed
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRepair;