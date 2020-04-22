context("embed", () => {
  beforeEach(() => {
    cy.setCookie("stayathomebanner-closed", "");
  });

  it("gets resized", () => {
    cy.visit("/");

    cy.get("#iFrameResizer0[style*=height]").then(($iframe) => {
      expect($iframe.outerHeight()).to.be.lessThan(150);
    });
    cy.get("#iFrameResizer1[style*=height]").then(($iframe) => {
      expect($iframe.outerHeight()).to.be.lessThan(150);
    });
  });

  it("is visible", () => {
    cy.visit("/");
    cy.get("#iFrameResizer0").should("be.visible");
    cy.get("#iFrameResizer1").should("be.visible");
  });

  it("is hidden when it fails to initialize", () => {
    cy.get("#iFrameResizer2").should("not.be.visible");
  });

  it("is hidden when cookie is set", () => {
    cy.setCookie("stayathomebanner-closed", "true");
    cy.visit("/");
    cy.get("#iFrameResizer0").should("not.be.visible");
    cy.get("#iFrameResizer1").should("not.be.visible");
    cy.get("#iFrameResizer2").should("not.be.visible");
  });
});
