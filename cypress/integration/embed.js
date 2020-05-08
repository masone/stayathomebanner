context("embed", () => {
  beforeEach(() => {
    setCookie("");
  });

  it("gets resized", () => {
    cy.visit("/");

    cy.get("#stayathomebanner[style*=height]").then(($iframe) => {
      expect($iframe.outerHeight()).to.be.lessThan(150);
    });
  });

  it("is visible", () => {
    cy.visit("/");
    cy.get("#stayathomebanner").should("be.visible");
  });

  it.skip("is hidden when it fails to initialize", () => {
    cy.get("#stayathomebanner").should("not.be.visible");
  });

  it("is hidden when cookie is set", () => {
    setCookie("closed");
    cy.visit("/");

    cy.get("#stayathomebanner").should("not.be.visible");
  });
});

function setCookie(value) {
  cy.setCookie("stayathomebanner", value, { sameSite: "lax" });
}
