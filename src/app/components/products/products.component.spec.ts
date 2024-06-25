import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { Product } from '../../product.model';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'addProduct', 'deleteProduct']);
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [{ provide: ProductService, useValue: productServiceSpy }]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    productService.getProducts.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', description: 'Desc 1', price: 100, imageUrl: 'http://example.com/1.jpg' },
      { id: '2', name: 'Product 2', description: 'Desc 2', price: 200, imageUrl: 'http://example.com/2.jpg' }
    ];
    productService.getProducts.and.returnValue(of(mockProducts));
    component.ngOnInit();
    expect(component.products.length).toBe(2);
    expect(component.products).toEqual(mockProducts);
  });

  it('should add a new product', () => {
    const newProduct: Product = { id: '3', name: 'Product 3', description: 'Desc 3', price: 300, imageUrl: 'http://example.com/3.jpg' };
    productService.addProduct.and.returnValue(of(newProduct));
    component.newProduct = { id: '3', name: 'Product 3', description: 'Desc 3', price: 300, imageUrl: 'http://example.com/3.jpg' };
    component.addProduct();
    expect(productService.addProduct).toHaveBeenCalledWith(newProduct);
  });

  it('should delete a product', () => {
    const productId = '1';
    productService.deleteProduct.and.returnValue(of(void 0));
    component.deleteProduct(productId);
    expect(productService.deleteProduct).toHaveBeenCalledWith(productId);
  });
});
