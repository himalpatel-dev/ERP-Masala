import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule if you need Angular directives (like *ngIf, *ngFor)

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // Include necessary modules
  template: `
    <div class="dashboard-container">
      <h2>👋 Welcome to the Admin Dashboard</h2>
      <p>This is where your main admin statistics, charts, and key metrics will be displayed.</p>
      
      <div class="stats-card">
        <h3>Total Users</h3>
        <p class="stat-number">1,245</p>
      </div>
      
      </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    h2 {
      color: #333;
      margin-bottom: 25px;
    }
    .stats-card {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: inline-block;
      min-width: 200px;
      text-align: center;
    }
    .stat-number {
      font-size: 2.5em;
      font-weight: bold;
      color: #007bff; /* Primary theme color */
      margin: 5px 0 0;
    }
  `]
})
export class DashboardComponent {
  // Component logic goes here (e.g., fetching data)
}